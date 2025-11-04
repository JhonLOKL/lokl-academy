"use client";

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formatNextDate } from '@/helpers/functions';
import { motion } from "framer-motion";

export default function FrequentlyQs() {
  const optionsList = [
    "Inversión",
    "Riesgos",
    "Reinversión",
    "Certificado",
  ];

  const optionsListSecond = [
    "Beneficios",
    "Proyectos",
    "Mercado secundario",
  ];

  const optionsListMobile = [
    "Inversión",
    "Riesgos",
    "Reinversión",
    "Certificado",
    "Beneficios",
    "Proyectos",
    "Mercado secundario",
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabOptions, setTabOptions] = useState(optionsList);
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const optionsMatch1 = tabOptions.every((element, index) => element === optionsList[index]);
  const optionsMatch2 = tabOptions.every((element, index) => element === optionsListSecond[index]);
  const optionsMatchMobile = tabOptions.every((element, index) => element === optionsListMobile[index]);

  const changeTabs = () => {
    setActiveTabIndex(0);
    if (optionsMatch1) setTabOptions(optionsListSecond);
    if (optionsMatch2) setTabOptions(optionsList);
  };

  const handleAccordionChange = (index: string[]) => {
    setActiveItems(index);
  };

  const panelVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const isMobileScreen = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    if (isMobileScreen) {
      setTabOptions(optionsListMobile);
      setActiveTabIndex(0);
    }
    // No restablecemos tabOptions en escritorio para preservar el estado del usuario
  }, [isMobileScreen]);

  return (
    <section id="pqrs" className='min-h-[300px] md:min-h-[400px] px-4 md:px-0 wrapper-lokl'>

    <Tabs 
      selectedIndex={activeTabIndex}
      onSelect={(index) => setActiveTabIndex(index)}
      className="py-10 md:px-20 px-0 mx-0 md:mx-11 w-90%  bg-[#f0f2f4d7] rounded-[50px]">
  
      <div className="flex flex-col  min-h-[300px] md:flex-row">
  
        {/* Left section */}
        <div className="lg:w-2/5 ml-11 md:ml-6 md:pl-14 pl-0" data-aos="fade-right">
  
          <motion.div 
            className="text-4xl mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
           <span className='font-thin text-[#4F4CF1] text-1xl md:text-5xl italic'>PREGUNTAS</span><br />  <span className='font-bold text-[#4F4CF1] text-1xl md:text-5xl italic'>FRECUENTES</span>
          </motion.div>
  
  
          <motion.div 
            className="text-lg md:text-xl leading-7 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            LOKL es una <span className='font-bold'>plataforma de inversión</span> <br />
            colaborativa 100% digital en proyectos <br />
            inmobiliarios que te ayuda a conectar <br />
            con proyectos innovadores y rentables, <br />
            en los que puedes invertir desde bajos <br />
            montos y obtener <span className='font-bold'>rentabilidades por</span> <br />
            <span className='font-bold'>valorización y rentas</span>, además de <br />
            beneficios en los proyectos y con la <br />
            comunidad de <span className='font-bold'> LOKL</span>.
          </motion.div>
  
          <motion.div
            className="mt-20 flex items-center justify-center md:mr-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 md:p-6"> 
              
              <div className="relative w-24 h-24 md:w-40 md:h-40 flex-shrink-0">
                <Image 
                  src="https://lokl-assets.s3.amazonaws.com/about-us/pipe.jpg"
                  alt="Asesor"
                  className="rounded-full border-2 border-[#4F4CF1] object-cover"
                  fill
                  sizes="(max-width: 768px) 96px, 160px"
                />
              </div>

              <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left">
                <div> 
                  <h2 className="text-base md:text-xl font-semibold text-black">Habla con nosotros</h2>
                  <p className="text-sm md:text-base font-medium text-gray-600">Asesórate o resuelve tus dudas con un experto.</p>
                </div>

                <a 
                  id='agendarCita'
                  href='https://api.whatsapp.com/send/?phone=573017328112&text=Hola%21%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20LOKL%20y%20agendar%20una%20cita😊'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-xs md:text-sm w-[140px] md:w-auto px-4 md:pl-9 py-2 md:py-1 font-semibold text-white bg-[#4F4CF1] rounded-full no-underline text-center self-center md:self-start"
                 >
                  Agenda una cita
                 </a>
              </div>
            </div>
          </motion.div>

  
        </div>
  
        {/* Right section */}
        <div className="px-5 md:px-0 md:w-1/2 md:ml-28" data-aos="fade-left">
  
          {/* Tab Navigation for mobile */}
          {isMobileScreen && (
            <div className="overflow-x-auto mt-9 mb-8">
              <TabList className="flex space-x-6 font-bold text-lg list-none">
                {
                  optionsListMobile.map((tab, key) => 
                    <Tab key={key} className={ `min-w-[100px] cursor-pointer outline-none text-center whitespace-nowrap ${ key === activeTabIndex && ' text-[#A5A4FF] ' }` }>
                      {tab}
                      { key === activeTabIndex && <div className='min-w-[100px] h-1 bg-[#5452F6] mt-2'></div> }
                    </Tab>
                  )
                }
              </TabList>
            </div>
          )}
  
          {/* Desktop tab list */}
          {!isMobileScreen && (
            <div className="mb-20 flex items-start relative">
  
              {
                optionsMatch2 &&
                <Image
                  className="mt-1 rotate-180 absolute -left-10 cursor-pointer"
                  src="/images/home/arrow-violet.svg"
                  alt="arrow"
                  onClick={() => changeTabs()}
                  width={24}
                  height={24}
                />
              }
  
              <TabList className="flex space-x-6 font-bold text-lg list-none">
                {
                  tabOptions.map((tab, key) =>
                    <Tab key={key} className={`min-w-[100px] cursor-pointer outline-none text-center ${key === activeTabIndex && ' text-[#A5A4FF] '}`}>
                      {tab}
                      {key === activeTabIndex && <div className='w-[100px] h-1 bg-[#5452F6] mt-2'></div>}
                    </Tab>
                  )
                }
              </TabList>
  
              {
                optionsMatch1 &&
                <Image
                  className="mt-1 absolute right-0 cursor-pointer"
                  src="/images/home/arrow-violet.svg"
                  alt="arrow"
                  onClick={() => changeTabs()}
                  width={24}
                  height={24}
                />
              }

            </div>
          )}

          {/* TabPanels for Desktop */}
          {!isMobileScreen && (
            <>
              {optionsMatch1 ? (
                <>
                  <TabPanel className="">
                    <div className="text-3xl font-bold mb-4">
                      ¿Cómo puedo invertir?
                    </div>

                    <div className="">
                      <p className="font-medium text-base leading-loose">
                        La membresía en Lokl es 100% digital y puedes comenzar tu participación siguiendo los siguientes pasos:
                      </p>

                      <br />

                      <ul className='list-decimal ml-4  font-medium text-base leading-loose'>
                        <li>Registrate</li>
                        <li>Elige el proyecto Nido de Agua</li> 
                        <li>Define el monto de tu participación</li>
                        <li>Llena tus datos personales y firma el contrato</li>
                        <li>Paga tu membresía</li>
                        <li>Revisa en tu perfil la participación</li> 
                      </ul>

                      <br />

                      <p className="font-medium text-base leading-7">
                         A partir del {formatNextDate()} el precio del Unit subira. Tu inversión la puedes realizar en este medio: <a className='hover:text-[#4F4CF1]' href="/nido">https://www.lokl.life/nido</a>.
                        <br /> <br /> La puedes realizar por medio del sitio web y puedes pagar por PSE o Tarjeta de crédito tanto nacional como internacional. Ten presente que si utilizas tarjeta de crédito tendrás un fee adicional de 2,5% .
                      </p>
                    </div>

                  </TabPanel>
                  
                  <TabPanel className="">

                    <div className='text-xl font-bold text-[#4F4CF1] mb-12'>
                      ¿Qué riesgos tienen los proyectos en los que participo?
                    </div>
                
                  <Accordion 
                    onChange={handleAccordionChange} 
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                  >
                    
                    <AccordionItem className="w-full my-2" uuid="item1">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">

                        <div className="">Riesgo de Construcción </div>

                        <Image 
                          className={activeItems.includes('item1') ? "rotate-180 transition-all duration-500 ease-in-out" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />

                      </AccordionItemButton>
                      <AccordionItemPanel className="w-10/12 leading-loose">

                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          ¿Qué pasa si hay problemas de viabilidad técnica? El equipo desarrollador del proyecto, antes de levantamiento de capital presenta estudios de suelos y estructurales que aseguran la viabilidad del proyecto.
                        </motion.div>

                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item2">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">
                        <div>Riesgo de inversión </div>

                        <Image 
                          className={activeItems.includes('item2') ? "rotate-180 transition-all duration-500 ease-in-out" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />
                      </AccordionItemButton>
                      <AccordionItemPanel className="w-10/12 leading-loose">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item2") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          Si la inversión no alcanza su punto de equilibrio, el dinero será devuelto por parte de la fiducia. Cabe aclarar que el dinero será devuelto descontando costos transaccionales. 
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item3">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">
                      
                        <div>Riesgo Comercial 🏨</div>

                        <Image 
                          className={activeItems.includes('item3') ? "rotate-180 transition-all duration-500 ease-in-out" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />
                      
                      </AccordionItemButton>
                      <AccordionItemPanel className="w-10/12 leading-loose">
                      
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          En la operación del inmueble. Contratos de operación con indicadores de éxito, metas comerciales y control de costo. Estudio de mercado con proyecciones a futuro. 
                        </motion.div>
                      
                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item4">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">

                        <div>Riesgo de valorización 📈</div>

                        <Image 
                          className={activeItems.includes('item4') ? "rotate-180 transition-all duration-500 ease-in-out" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />

                      </AccordionItemButton>
                      <AccordionItemPanel className="w-10/12 leading-loose">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          Se utiliza un modelo de flujo de caja futuro, el mercado secundario permite potencial de compra frente a nuevos inversionistas que deseen invertir en el proyecto. 
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  
                  </Accordion>
                
                  </TabPanel>
                  
                  <TabPanel className="">
                  
                    <div className="text-xl font-bold mb-12">
                      ¿Hay posibilidad de reinversión en otros proyectos?    
                    </div>
                    
                    <p className='leading-loose'>
                      Sí, puedes reinvertir en los proyectos 😍 utilizando tanto las ganancias generadas como tus ingresos adicionales. 💰Uno de los beneficios de invertir con Lokl es que puedes reinvertir con el Unit al mismo precio 💵al que inviertiste inicialmente.
                    </p>
                  
                  </TabPanel>
                  
                  <TabPanel className="">
                    
                    <div className="text-xl font-bold mb-4">
                      ¿Cuál es el certificado de la inversión?
                    </div>
                    
                    <p className='leading-loose'>
                      Tu inversión está respaldada por un contrato de mandato que te otorga derechos fiduciarios sobre el proyecto, es decir, tu obtienes una participación sobre este, según el monto que inviertas.
                    </p>

                  </TabPanel>
                </>
              ) : optionsMatch2 ? (
                <>
                  <TabPanel className="">
                    <div className="text-xl font-bold mb-4">
                      ¿Cuáles son los beneficios de invertir con Lokl?
                    </div>

                  <div className="leading-loose">
                    En nuestra sección 💻: <a className='hover:text-[#AAA9FF]' href="/nido">https://www.lokl.life/nido</a> encuentras la sección de tipos de inversionistas donde se muestra los beneficios 🤩 según montos de inversión. Por ejemplo, si inviertes desde 15 Millones tendrás: 
                  </div>

                  <br />

                  <div className="leading-loose">
                    10% en espacios operados por Nido de Agua 🌲 
                  </div>

                  <div className="leading-loose">
                    Participa de las loterías para noches y beneficios  
                  </div>

                  <div className="leading-loose">
                    Ser el primero en listas de espera para nuevos proyectos 
                  </div>

                  <div className="leading-loose">
                    Mercado secundario
                  </div>

                  </TabPanel>
                  
                  <TabPanel className="">

                    <div className="text-xl font-bold mb-4">
                      ¿Qué proyectos exitosos han tenido?
                    </div>
                
                    <p className='leading-loose'>
                      Nuestro proyecto exitoso  es Indie Universe, un coliving para creativos  ubicado en el barrio Laureles - Medellín con proyecciones de retorno de +12 E.A. Hemos levantado + $3.500 Millones COP 💵 y somos + de 500 inversionistas 👥. Actualmente estamos en etapa 3, con un valor del Unit de 125.000, con posibilidad de invertir a través de mercado secundario. Puedes conocer más detalles en: <a className='hover:text-[#AAA9FF]' href="https://docs.google.com/forms/d/e/1FAIpQLSfcOYjUM0EYyehLHiKj2aOSyUAL7pC56gWOHz5cR77DiJzYHw/viewform?usp=pp_url">Indie Universe</a>
                    </p>
                  
                  </TabPanel>
                  
                  <TabPanel className="">

                    <div className="text-xl font-bold mb-4">
                      ¿Qué es mercado secundario?
                    </div>
                    
                    <p className='leading-loose'>
                      LOKL te ofrece vender 💵 tu participación a terceros interesados en invertir en el proyecto , lo que se conoce como mercado secundario. Puedes retirar tu inversión a través de la plataforma de LOKL  💻luego del primer año sobre la cuál habrás obtenido valorización 📈, en caso que aún el proyecto se encuentre en fase de construcción o valorización y rentabilidad en caso que el proyecto ya esté operando.
                    </p>

                    <br />

                    <p className='leading-loose'>
                      Puedes conocer más de los beneficios en: <a className='hover:text-[#AAA9FF]' href="https://www.lokl.life/nido">https://www.lokl.life/nido</a>
                    </p>
                  
                  </TabPanel>
                </>
              ) : null}
            </>
          )}

          {/* TabPanels for Mobile (7 tabs) - Always render when mobile */}
          {isMobileScreen && (
              <>
                <TabPanel className="">
                  <div className="text-xl font-bold mb-4">
                    ¿Cómo puedo invertir?
                  </div>

                  <div>
                    <p className=''>
                      La inversión en Lokl es 100% digital  y puedes invertir siguiendo los siguientes pasos:
                    </p>

                    <br />

                    <ul className='list-decimal ml-4'>
                      <li>Registrate</li>
                      <li>Elige el proyecto Nido de Agua</li> 
                      <li>Define el monto de inversión </li>
                      <li>Llenar datos personales y firmar el contrato </li>
                      <li>Paga tu inversión </li>
                      <li>Revisa en tu dashboard la inversión</li> 
                    </ul>

                    <br />

                    <p className="font-medium text-base leading-7">
                       A partir del {formatNextDate()} el precio del Unit subira. Tu inversión la puedes realizar en este medio: <a className='hover:text-[#4F4CF1]' href="/nido">https://www.lokl.life/nido</a>.
                      <br /> <br /> La puedes realizar por medio del sitio web y puedes pagar por PSE o Tarjeta de crédito tanto nacional como internacional. Ten presente que si utilizas tarjeta de crédito tendrás un fee adicional de 2,5% .
                    </p>
                  </div>

                </TabPanel>
                
                <TabPanel className="">

                  <div className='text-xl font-bold text-[#AAA9FF] mb-12'>
                    ¿Qué riesgos tienen los proyectos en los que invierto?
                  </div>
                
                  <Accordion 
                    onChange={handleAccordionChange}
                    allowMultipleExpanded={true}
                    allowZeroExpanded={true}
                  >
                    
                    <AccordionItem className="w-full my-2" uuid="item1">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">

                        <div className="">Riesgo de Construcción </div>

                        <Image 
                          className={activeItems.includes('item1') ? "rotate-180" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />

                      </AccordionItemButton>
                      <AccordionItemPanel className="">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          ¿Qué pasa si hay problemas de viabilidad técnica? El equipo desarrollador del proyecto, antes de levantamiento de capital presenta estudios de suelos y estructurales que aseguran la viabilidad del proyecto.
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item2">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">
                        <div>Riesgo de inversión </div>

                        <Image 
                          className={activeItems.includes('item2') ? "rotate-180" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />
                      </AccordionItemButton>
                      <AccordionItemPanel className="">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          Si la inversión no alcanza su punto de equilibrio, el dinero será devuelto por parte de la fiducia. Cabe aclarar que el dinero será devuelto descontando costos transaccionales. 
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item3">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">
                      
                        <div>Riesgo Comercial </div>

                        <Image 
                          className={activeItems.includes('item3') ? "rotate-180" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />
                      
                      </AccordionItemButton>
                      <AccordionItemPanel className="">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          En la operación del inmueble. Contratos de operación con indicadores de éxito, metas comerciales y control de costo. Estudio de mercado con proyecciones a futuro. 
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                    
                    <AccordionItem className="w-full my-2" uuid="item4">
                      <AccordionItemButton className="flex justify-between font-bold py-2 rounded-md">

                        <div>Riesgo de valorización </div>

                        <Image 
                          className={activeItems.includes('item4') ? "rotate-180" : ''} 
                          src="/images/arrow-down.svg" 
                          alt="arrow-down"
                          width={24}
                          height={24}
                        />

                      </AccordionItemButton>
                      <AccordionItemPanel className="">
                        <motion.div
                          className="accordion-content"
                          variants={panelVariants}
                          initial="closed"
                          animate={activeItems.includes("item1") ? "open" : "closed"}
                          exit="closed"
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          Se utiliza un modelo de flujo de caja futuro, el mercado secundario permite potencial de compra frente a nuevos inversionistas que deseen invertir en el proyecto. 
                        </motion.div>
                      </AccordionItemPanel>
                    </AccordionItem>
                  
                  </Accordion>
                
                </TabPanel>
                
                <TabPanel className="">
                
                  <div className="text-xl font-bold mb-12">
                    ¿Hay posibilidad de reinversión en otros proyectos?    
                  </div>
                  
                  <p className='font-mono'>
                    Sí, puedes reinvertir en los proyectos  utilizando tanto las ganancias generadas como tus ingresos adicionales. Uno de los beneficios de invertir con Lokl es que puedes reinvertir con el Unit al mismo precio al que inviertiste inicialmente.
                  </p>
                
                </TabPanel>
                
                <TabPanel className="">
                  
                  <div className="text-xl font-bold mb-4">
                    ¿Cuál es el certificado de la inversión?
                  </div>
                  
                  <p className='font-mono'>
                    Tu inversión está respaldada por un contrato de mandato que te otorga derechos fiduciarios sobre el proyecto, es decir, tu obtienes una participación sobre este, según el monto que inviertas.
                  </p>

                </TabPanel>
                
                <TabPanel className="">

                  <div className="text-xl font-bold mb-4">
                    ¿Cuáles son los beneficios de invertir con Lokl?
                  </div>

                  <div className="font-mono">
                    En nuestra sección : https://www.lokl.life/nido encuentras la sección de tipos de inversionistas donde se muestra los beneficios  según montos de inversión. Por ejemplo, si inviertes desde 15 Millones tendrás: 
                  </div>

                  <br />

                  <div className="font-mono">
                    10% en espacios operados por Nido de Agua 
                  </div>

                  <div className="font-mono">
                    Participa de las loterías para noches y beneficios  
                  </div>

                  <div className="font-mono">
                    Ser el primero en listas de espera para nuevos proyectos 
                  </div>

                  <div className="font-mono">
                    Mercado secundario
                  </div>

                </TabPanel>
                
                <TabPanel className="">

                  <div className="text-xl font-bold mb-4">
                    ¿Qué proyectos exitosos han tenido?
                  </div>
              
                  <p className="font-mono">
                    Nuestro proyecto exitoso  es Indie Universe, un coliving para creativos  ubicado en el barrio Laureles - Medellín con proyecciones de retorno de +12 E.A. Hemos levantado + $3.500 Millones COP 💵 y somos + de 500 inversionistas 👥. Actualmente estamos en etapa 3, con un valor del Unit de 125.000, con posibilidad de invertir a través de mercado secundario. Puedes conocer más detalles en: <a href="https://docs.google.com/forms/d/e/1FAIpQLSfcOYjUM0EYyehLHiKj2aOSyUAL7pC56gWOHz5cR77DiJzYHw/viewform?usp=pp_url">Indie Universe</a>
                  </p>
                
                </TabPanel>
                
                <TabPanel className="font-mono">

                  <div className="text-xl font-bold mb-4">
                    ¿Qué es mercado secundario?
                  </div>
                  
                  <p>
                    LOKL te ofrece vender  tu participación a terceros interesados en invertir en el proyecto , lo que se conoce como mercado secundario. Puedes retirar tu inversión a través de la plataforma de LOKL  💻luego del primer año sobre la cuál habrás obtenido valorización 📈, en caso que aún el proyecto se encuentre en fase de construcción o valorización y rentabilidad en caso que el proyecto ya esté operando.
                  </p>

                  <br />

                  <p>
                    Puedes conocer más de los beneficios en: <a href="https://www.lokl.life/nido">https://www.lokl.life/nido</a>
                  </p>
                
                </TabPanel>
              </>
          )}

          </div>

        </div>

      </Tabs>

    </section>
  );
}
