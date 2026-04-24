// React
import React, { useState, useEffect } from 'react';

// MUI
import Box from '@mui/material/Box';

// Utils
import { toastSuccess, toastError } from '@/utils/notify';

// API y Esquemas
import { getEmpresa, updateEmpresa } from '@/api/empresa.api';
import { empresaSchema } from '@/schemas/empresa.schema';

// Componentes propios
import Title from '@/components/common/Title';
import MainButton from '@/components/common/MainButton';
import CompanyDataSection from '@/components/company/CompanyDataSection';
import ScheduleSection from '@/components/common/ScheduleSection';
import CompanyGallerySection from '@/components/company/CompanyGallerySection';
import Loader from '@/components/common/Loader';

const CompanyInfo = () => {
  // <--------------- ESTADOS --------------->

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    descripcion: '',
    slogan: '',
    direccion: '',
    logo: null,
    archivoFisicoLogo: null,
  });

  const [scheduleMap, setScheduleMap] = useState({
    Domingo: [],
    Lunes: [],
    Martes: [],
    Miércoles: [],
    Jueves: [],
    Viernes: [],
    Sábado: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // <--------------- EFFECTS --------------->

  // GET datos de la empresa
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await getEmpresa();
        const data = response.empresa;

        if (data) {
          // Id empresa
          setEmpresaId(data._id || data.id);

          // Datos empresa
          setFormData({
            nombre: data.nombre || '',
            correo: data.correo || '',
            telefono: data.telefono || '',
            descripcion: data.descripcion || '',
            slogan: data.slogan || '',
            direccion: data.direccion || '',
            logo: data.logo?.url || null,
            archivoFisicoLogo: null,
          });

          // Imagen principal
          setMainImage(data.imagenPrincipal?.url || null);

          // Galeria
          if (data.galeria) {
            const urlsGaleria = data.galeria.map((img) => img.url);
            setGalleryImages(urlsGaleria);
          }

          // Horario
          if (data.horarioGlobal) {
            const newSchedule = {
              Domingo: [],
              Lunes: [],
              Martes: [],
              Miércoles: [],
              Jueves: [],
              Viernes: [],
              Sábado: [],
            };

            const diasMap = {
              domingo: 'Domingo',
              lunes: 'Lunes',
              martes: 'Martes',
              miercoles: 'Miércoles',
              jueves: 'Jueves',
              viernes: 'Viernes',
              sabado: 'Sábado',
            };

            // Funcion que convierte las horas por 2 bloques de media hora
            const generarBloquesString = (inicio, fin) => {
              const timeToMins = (time) => {
                const [h, m] = time.split(':').map(Number);
                return h * 60 + m;
              };
              const minsToTime = (mins) => {
                const h = Math.floor(mins / 60)
                  .toString()
                  .padStart(2, '0');
                const m = (mins % 60).toString().padStart(2, '0');
                return `${h}:${m}`;
              };

              const bloques = [];
              const startMins = timeToMins(inicio);
              const endMins = timeToMins(fin);

              for (let m = startMins; m < endMins; m += 30) {
                bloques.push(`${minsToTime(m)}-${minsToTime(m + 30)}`);
              }
              return bloques;
            };

            // Se llena el calendario
            data.horarioGlobal.forEach((slot) => {
              const diaKey = diasMap[slot.dia.toLowerCase()];
              if (diaKey) {
                const bloquesDelDia = generarBloquesString(
                  slot.horaInicio,
                  slot.horaFin,
                );
                newSchedule[diaKey] = [
                  ...newSchedule[diaKey],
                  ...bloquesDelDia,
                ];
              }
            });

            setScheduleMap(newSchedule);
          }
        }
      } catch (error) {
        toastError('Error al cargar los datos de la empresa.', 'get-empresa');
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchDatos();
  }, []);

  // <--------------- FUNCIONES --------------->

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
        archivoFisicoLogo: file,
      }));
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
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setGalleryImages((prev) => [...prev, ...newUrls]);
      setGalleryFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setGalleryImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    setGalleryFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSave = () => {
    // Si ya se esta guardando, se ignoran los clicks extras
    if (isSaving) return;

    // Se bloquea el boton
    setIsSaving(true);

    toastSuccess(
      'Datos de la empresa actualizados correctamente.',
      'company-save-toast',
    );

    setTimeout(() => {
      setIsSaving(false);
    }, 3000);
  };
  
  // Todavia no esta terminada
  // const handleSave = async () => {
  //   if (isSaving) return;

  //   try {
  //     setIsSaving(true);

  //     const payload = new FormData();

  //     payload.append('nombre', formData.nombre);
  //     payload.append('correo', formData.correo);
  //     payload.append('telefono', formData.telefono);
  //     payload.append('descripcion', formData.descripcion);
  //     payload.append('slogan', formData.slogan);
  //     payload.append('direccion', formData.direccion);

  //     const horarioArray = [];
  //     const diasReverseMap = {
  //       Domingo: 'domingo',
  //       Lunes: 'lunes',
  //       Martes: 'martes',
  //       Miércoles: 'miercoles',
  //       Jueves: 'jueves',
  //       Viernes: 'viernes',
  //       Sábado: 'sabado',
  //     };

  //     for (const [dia, slots] of Object.entries(scheduleMap)) {
  //       slots.forEach((slot) => {
  //         horarioArray.push({
  //           dia: diasReverseMap[dia],
  //           horaInicio: slot.inicio,
  //           horaFin: slot.fin,
  //         });
  //       });
  //     }
  //     payload.append('horarioGlobal', JSON.stringify(horarioArray));

  //     if (formData.archivoFisicoLogo) {
  //       payload.append('logo', formData.archivoFisicoLogo);
  //     }
  //     if (mainImageFile) {
  //       payload.append('imagenPrincipal', mainImageFile);
  //     }

  //     galleryFiles.forEach((file) => {
  //       payload.append('nuevasfotosgaleria', file);
  //     });

  //     const fotosConservadas = galleryImages.filter((url) =>
  //       url.startsWith('http'),
  //     );
  //     fotosConservadas.forEach((url) => {
  //       payload.append('galeriaconservada[]', url);
  //     });

  //     await updateEmpresa(empresaId, payload);
  //     toastSuccess(
  //       'Datos de la empresa actualizados correctamente.',
  //       'company-save-toast',
  //     );
  //   } catch (error) {
  //     toastError(
  //       typeof error === 'string' ? error : 'Error al guardar los datos',
  //       'company-error',
  //     );
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  // <--------------- RENDER --------------->

  if (isLoadingData) return <Loader height='100%' />;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        width: '100%',
        maxWidth: '1000px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Box>
        <Title
          children='INFORMACIÓN DE LA EMPRESA'
          size={{ xs: '2rem', md: '2.8rem' }}
          color='white'
          align='left'
        />
      </Box>

      {/* Datos */}
      <Box>
        <CompanyDataSection
          formData={formData}
          handleInputChange={handleInputChange}
          handleLogoChange={handleLogoChange}
        />
      </Box>

      {/* Horario */}
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: '16px',
          border: (theme) => theme.palette.customBorders.section,
        }}
      >
        <ScheduleSection
          scheduleMap={scheduleMap}
          setScheduleMap={setScheduleMap}
        />
      </Box>

      {/* Galeria */}
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: '16px',
          border: (theme) => theme.palette.customBorders.section,
        }}
      >
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
          onClick={handleSave}
          disabled={isSaving}
          sx={{
            backgroundColor: isSaving
              ? 'action.disabledBackground'
              : 'primary.light',
            color: isSaving ? 'action.disabled' : 'primary.contrastText',
            px: 8,
            cursor: isSaving ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          Guardar
        </MainButton>
      </Box>
    </Box>
  );
};

export default CompanyInfo;
