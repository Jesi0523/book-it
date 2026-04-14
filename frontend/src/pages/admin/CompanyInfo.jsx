import React, { useState } from 'react';
import Box from '@mui/material/Box';

// Layout
import AdminLayout from '@/layouts/AdminLayout';

// Componentes propios
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';
import CompanyDataSection from '@/components/company/CompanyDataSection'; 
import ScheduleSection from '@/components/common/ScheduleSection'; 
import CompanyGallerySection from '@/components/company/CompanyGallerySection';
import BaseDialog from '@/components/common/BaseDialog';

// Iconos
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

const CompanyInfo = () => {
  // ESTADOS

  const [formData, setFormData] = useState({
    nombre: '', correo: '', telefono: '', descripcion: '', slogan: '', direccion: '', logo: null, archivoFisicoLogo: null,
  });

  const [scheduleMap, setScheduleMap] = useState({
    Domingo: [], Lunes: [], Martes: [], Miércoles: [], Jueves: [], Viernes: [], Sábado: []
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // Consts para modal de confirmación
    const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
    const handleOpenSaveDialog = () => { setOpenSaveDialog(true); console.log(isEditing)};
    const handleCloseSaveDialog = (hasAccepted) => 
    {
      setOpenSaveDialog(false);
      if(hasAccepted){handleSave;}; 
    };
  


  // FUNCIONES

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: URL.createObjectURL(file), archivoFisicoLogo: file }));
    }
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
      setMainImageFile(file);
    }
  };

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      setGalleryImages(prev => [...prev, ...newUrls]);
      setGalleryFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setGalleryImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setGalleryFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSave = () => {
    console.log('Guardando información...', { 
      formData, 
      scheduleMap, 
      galeria: { mainImageFile, galleryFiles } 
    });
  };

  return (
    <AdminLayout>
      <Box sx={{ p: { xs: 2, md: 5 }, width: '100%', maxWidth: '1000px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
        
        <Box>
          <Title children='INFORMACIÓN DE LA EMPRESA' size={{ xs: '2rem', md: '2.8rem' }} color='white' align='left' />
        </Box>

        {/* Datos */}
        <Box>
          <CompanyDataSection formData={formData} handleInputChange={handleInputChange} handleLogoChange={handleLogoChange} />
        </Box>

        {/* Horario */}
        <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px', border: `1px solid #787ff6` }}>
          <ScheduleSection scheduleMap={scheduleMap} setScheduleMap={setScheduleMap} />
        </Box>

        {/* Galeria */}
        <Box sx={{ p: { xs: 2, md: 4 }, borderRadius: '16px', border: `1px solid #787ff6` }}>
          <CompanyGallerySection 
            mainImage={mainImage}
            onMainImageChange={handleMainImageChange}
            galleryImages={galleryImages}
            onGalleryImagesChange={handleGalleryImagesChange}
            onRemoveGalleryImage={handleRemoveGalleryImage}
          />
        </Box>

        {/* Boton guardar */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <MainButton 
            size={{ xs: '16px', md: '18px' }}
            onClick={handleOpenSaveDialog} 
            sx={{ backgroundColor: '#ffb74d', color: '#000', px: 8 }}>
            Guardar
          </MainButton>
        </Box>
      </Box>
      <BaseDialog
        id="save-company-data"
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
        title={"Atención"}
        icon={<AdvertismentIcon/>}
        content={<>Actualizará los datos de la empresa<br/><b>¿desea continuar?</b></>}
      />
    </AdminLayout>
  );
};

export default CompanyInfo;