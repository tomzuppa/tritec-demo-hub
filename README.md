# TRI-TEC Hub - Maqueta conceptual

Version fusionada: el sitio corporativo completo mas las capacidades de portal.
Mantiene todo el contenido del brief (soluciones, proyectos, confianza y cumplimiento,
talento, proveedores, formularios) y agrega el asistente conversacional y los tres
accesos por rol.

La version sin portal vive en el repo `tritec-demo` y sigue vigente para comparar.

## Paginas

Sitio corporativo
- index.html                        Inicio con asistente y las dos puertas del portal
- soluciones.html                   Listado de las 7 soluciones
- soluciones-mantenimiento.html     Pagina de solucion, 10 preguntas del brief
- proyectos.html                    Listado con filtros
- proyecto-adecuacion-linea.html    Caso completo
- confianza-cumplimiento.html       Registros con alcance y vigencia
- talento.html / talento-vacante.html
- proveedores.html                  Registro de proveedores
- rfq.html / confirmacion.html      Formulario por pasos y confirmacion

Portal
- acceso.html            Login con los tres roles (?rol=proveedor|cliente|tritec)
- panel-proveedor.html   Oportunidades, expediente con vigencias, postulaciones
- panel-cliente.html     Requerimientos, propuestas recibidas, documentos
- panel-tritec.html      Bandeja de consolidacion: cruces sugeridos, demanda y oferta

## El asistente

Embebido en la home y disponible como lanzador flotante en el resto del sitio.
Responde por coincidencia sobre el catalogo real de TRI-TEC (catalogo de servicios,
presentacion a General Motors y one-pager de proyectos de ingenieria). Ocho categorias.

Nunca afirma capacidad: la plantea en condicional y deriva a evaluacion. Si no encuentra
la necesidad en el catalogo, lo dice en lugar de inventar.

En produccion va con modelo y recuperacion sobre el catalogo cargado en el CMS. En la
maqueta no hay llamada a ningun modelo: meter una llave de API en un sitio publico la
expone.

## Advertencias

- Sin servidor. Ningun formulario envia ni almacena datos.
- El acceso no valida: cualquier dato abre el panel correspondiente.
- Los datos de los paneles son de ejemplo.
- Imagenes provisionales de banco, etiquetadas como tales.
- Los KPIs y nombres de clientes provienen de materiales de TRI-TEC y estan sujetos a
  validacion y autorizacion.
