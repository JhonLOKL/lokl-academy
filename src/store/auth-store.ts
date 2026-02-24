import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInAction, signUpAction } from '@/actions/auth-service';
import { getUserProfileService } from '@/services/user-service';
import { postApi } from '@/schemas/api-schema';

// Definir la interfaz para el usuario
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string | null;
  leadOrigin?: string;
  pageOrigin?: string;
  termsAccepted?: boolean;
  uniqueCode?: string;
  emailVerified?: boolean;
  phone?: string;
  countryPhoneCode?: string;
  documentNumber?: string;
  documentType?: string;
  identityValidations?: Array<{
    id: string;
    userId: string;
    processId: string;
    provider: string;
    score: number | null;
    status: string;
    reportUrl: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  profilePhoto?: string;
  inArrears?: boolean;
  inArrearsAmount?: number;
  pendingAmount?: number;
  planType: string;
  plan: string;
  isInvestor?: boolean;
}

// Alias para compatibilidad con código existente
type User = UserProfile;

// Definir la interfaz para el estado de autenticación
interface AuthState {
  user: User | null;
  token: string | null; // Re-added token for fallback
  isLoading: boolean;
  error: string | null;

  // Métodos
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  fetchUserProfile: () => Promise<boolean>;
}

// Interfaz para los datos de registro
interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  countryPhoneCode: string;
  howDidYouHearAboutUs: string;
  referralCode?: string;
  termsAccepted: boolean;
  pageOrigin: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

// Crear el store con persistencia
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null, // Initialize token
      isLoading: false,
      error: null,

      // Método para iniciar sesión
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await signInAction({ email, password });

          if (response?.success) {
            // Guardamos el token en el store como fallback
            const token = response.token || null;
            set({ token: token });

            // Obtener el perfil completo del usuario
            await get().fetchUserProfile();
            set({ isLoading: false });
            return true;
          } else {
            set({
              error: response?.message || 'Error al iniciar sesión',
              isLoading: false
            });
            return false;
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error desconocido',
            isLoading: false
          });
          return false;
        }
      },

      // Método para registrarse
      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          // Adaptar los datos para el action de registro
          const serviceData = {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            countryPhoneCode: userData.countryPhoneCode,
            leadOrigin: userData.howDidYouHearAboutUs,
            pageOrigin: userData.pageOrigin || 'LOKL Academy',
            referralCode: userData.referralCode || '',
            termsAccepted: userData.termsAccepted,
            ...(userData.utmSource && { utmSource: userData.utmSource }),
            ...(userData.utmMedium && { utmMedium: userData.utmMedium }),
            ...(userData.utmCampaign && { utmCampaign: userData.utmCampaign }),
            ...(userData.utmTerm && { utmTerm: userData.utmTerm }),
            ...(userData.utmContent && { utmContent: userData.utmContent }),
          };

          const response = await signUpAction(serviceData);

          if (response?.success) {
            // Guardamos el token en el store como fallback
            const token = response.token || null;
            set({ token: token });

            // Obtener el perfil completo del usuario
            await get().fetchUserProfile();
            set({ isLoading: false });
            return true;
          } else {
            set({
              error: response?.message || 'Error al registrarse',
              isLoading: false
            });
            return false;
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error desconocido',
            isLoading: false
          });
          return false;
        }
      },

      // Método para cerrar sesión
      logout: async () => {
        try {
          // Llamar al endpoint de logout para limpiar la cookie
          await postApi('/api/auth/logout');
        } catch (error) {
          console.error('Error durante logout:', error);
        } finally {
          // Limpiar estado local independientemente del resultado del servidor
          set({ user: null, token: null });

          // Eliminar el token del localStorage manualmente si existe
          // Esto asegura que cuando se cierra sesión en otro dominio (localhost:3000),
          // el token también se elimine aquí (localhost:4000)
          if (typeof window !== 'undefined') {
            try {
              const storageKey = 'lokl-auth-storage';
              const stored = localStorage.getItem(storageKey);
              if (stored) {
                const parsed = JSON.parse(stored);
                // Si existe el token en el localStorage, eliminarlo
                if (parsed.state?.token) {
                  parsed.state.token = null;
                  localStorage.setItem(storageKey, JSON.stringify(parsed));
                }
              }
            } catch (e) {
              console.error('Error limpiando token del localStorage:', e);
            }
          }

          // Opcional: Redirigir si es necesario, pero usualmente lo hace el componente
          if (typeof window !== 'undefined') {
            // window.location.href = '/login'; 
          }
        }
      },

      // Método para limpiar errores
      clearError: () => {
        set({ error: null });
      },

      // Método para obtener el perfil completo del usuario
      fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await getUserProfileService();

          if (response?.success && response.data) {
            // Asegurar que planType siempre tenga un valor (default: 'basic')
            // Normalizar el plan buscando múltiples propiedades posibles
            let rawPlan = response.data.planType || response.data.plan || response.data.subscription || 'none';

            // Normalizar a minúsculas
            if (typeof rawPlan === 'string') {
              rawPlan = rawPlan.toLowerCase();
            }

            const userData = {
              ...response.data,
              planType: rawPlan,
              plan: rawPlan,
              isInvestor: !!response.data.isInvestor || rawPlan === 'investor'
            };
            set({ user: userData, isLoading: false });
            return true;
          } else {
            // Si hay un error 403 (Forbidden) o 401, cerrar sesión
            if (response?.status === 403 || response?.status === 401) {
              set({ user: null, token: null, isLoading: false });
            } else {
              set({
                error: response?.message || 'Error al obtener el perfil del usuario',
                isLoading: false
              });
            }
            return false;
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Error desconocido',
            isLoading: false
          });
          return false;
        }
      }
    }),
    {
      name: 'lokl-auth-storage', // Nombre para localStorage
      // NOTA: El token NO se persiste en localStorage para SSO con cookies compartidas.
      // El token solo se mantiene en memoria como fallback si las cookies fallan.
      // Cuando se cierra sesión en otro dominio (ej: localhost:3000), la cookie se elimina
      // y este dominio (localhost:4000) debe detectar la sesión cerrada sin depender del token en localStorage.
      partialize: (state) => ({
        user: state.user,
        // token: state.token, // COMENTADO: No persistir token en localStorage para SSO
      }),
    }
  )
);
