import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signInAction, signUpAction } from '@/actions/auth-service';
import { getUserProfileService } from '@/services/user-service';

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
}

// Alias para compatibilidad con código existente
type User = UserProfile;

// Definir la interfaz para el estado de autenticación
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Métodos
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateToken: (token: string) => void;
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
}

// Crear el store con persistencia
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Método para iniciar sesión
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await signInAction({ email, password });
          
          if (response?.success && response.token) {
            // Guardar el token - el token ya viene directamente en response.token
            set({ token: response.token, isLoading: false });
            
            // Obtener el perfil completo del usuario
            await get().fetchUserProfile();
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
            termsAccepted: userData.termsAccepted
          };

          const response = await signUpAction(serviceData);
          
          if (response?.success && response.token) {
            // Guardar el token - el token ya viene directamente en response.token
            set({ token: response.token, isLoading: false });
            
            // Obtener el perfil completo del usuario
            await get().fetchUserProfile();
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
      logout: () => {
        set({ user: null, token: null });
      },

      // Método para actualizar el token
      updateToken: (token: string) => {
        set({ token });
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
            let rawPlan = response.data.planType || response.data.plan || response.data.subscription || 'basic';
            
            // Normalizar a minúsculas
            if (typeof rawPlan === 'string') {
              rawPlan = rawPlan.toLowerCase();
            }

            const userData = {
              ...response.data,
              planType: rawPlan,
            };
            set({ user: userData, isLoading: false });
            return true;
          } else {
            // Si hay un error 403 (Forbidden), cerrar sesión
            if (response?.status === 403) {
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
      partialize: (state) => ({ user: state.user, token: state.token }), // Solo persistir usuario y token
    }
  )
);
