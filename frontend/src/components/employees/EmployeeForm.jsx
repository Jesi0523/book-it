import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

// Componentes propios
import MainButton from '@/components/common/MainButton';
import EmployeeDataSection from '@/components/employees/sections/EmployeeDataSection';
import ScheduleSection from '@/components/employees/sections/ScheduleSection';
import ServicesSection from '@/components/employees/sections/ServicesSection'; 

// <----------- DUMMY DATA ----------->

// Servicios
const availableDummyServices = [
  'Corte de dama',
  'Corte de caballero',
  'Barba y bigote',
  'Tinte y luces',
  'Manicura Spa',
  'Pedicura Spa',
  'Maquillaje de noche',
  'Peinado de dama',
  'Tratamiento capilar',
  'Cejas y pestañas',
  'Depilación corporal',
  'Limpieza facial',
];

// <----------- LOGICA ----------->
const EmployeeForm = ({ employee, onCancel, onSave }) => {
  // Estados
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', birthdate: '', info: '', foto: null, archivoFisico: null,
  });
  const [scheduleMap, setScheduleMap] = useState({
    Domingo: [], Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: []
  });
  const [selectedServices, setSelectedServices] = useState([]);

  // <----------- UseEffects ----------->
  useEffect(() => {
    if (employee && employee.id !== 'nuevo') {
      setFormData({
        name: employee.name || '', email: employee.email || '', phone: employee.phone || '',
        birthdate: employee.birthdate || '', info: employee.info || '', foto: employee.foto || null, archivoFisico: null,
      });
      if (employee.scheduleMap) {
        setScheduleMap(employee.scheduleMap);
      }
      if (employee.services) {
        setSelectedServices(employee.services);
      } else {
        setSelectedServices([]);
      }

    } else {
      setFormData({ name: '', email: '', phone: '', birthdate: '', info: '', foto: null, archivoFisico: null });
      setScheduleMap({ Domingo: [], Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: [] });
      setSelectedServices([]);
    }
  }, [employee]);

  // Funcion input text
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Funcion fecha
  const handleDateChange = (event) => {
    setFormData((prev) => ({ ...prev, birthdate: event.target.value }));
  };

  // Funcion foto
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, foto: photoUrl, archivoFisico: file }));
    }
  };

  // Agregar / Quitar servicios
  const handleServiceToggle = (serviceName) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceName)) {
        return prev.filter(name => name !== serviceName);
      } else {
        return [...prev, serviceName];
      }
    });
  };

  // Funcion agregar/editar empleado
  const handleSubmit = () => {
    onSave({ 
      ...employee, 
      ...formData, 
      scheduleMap, 
      services: selectedServices
    });
  };

  // Estructura
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, color: 'white' }}>
      
      {/* Datos del empleado */}
      <Box>
        <EmployeeDataSection 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleDateChange={handleDateChange} 
          handlePhotoChange={handlePhotoChange} 
        />
      </Box>

      {/* Horario */}
      <Box sx={{p: { xs: 2, md: 4 }, borderRadius: '16px', border: `1px solid #787ff6` }}>
        <ScheduleSection 
          scheduleMap={scheduleMap} 
          setScheduleMap={setScheduleMap} 
        />
      </Box>

      {/* Servicios */}
      <Box sx={{p: { xs: 2, md: 4 }, borderRadius: '16px', border: `1px solid #787ff6` }}>
        <ServicesSection 
          availableServices={availableDummyServices} 
          selectedServices={selectedServices} 
          onServiceToggle={handleServiceToggle} 
        />
      </Box>

      {/* Boton guardar */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <MainButton size={{ xs: '16px', md: '18px' }} onClick={handleSubmit} sx={{ backgroundColor: '#ffb74d', color: '#000', px: 6 }}>
          {employee?.id === 'nuevo' ? 'Agregar' : 'Guardar'}
        </MainButton>
      </Box>

    </Box>
  );
};

export default EmployeeForm;