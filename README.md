# TRI-TEC Hub - Maqueta conceptual

Segunda maqueta para la propuesta de BAOBYTE. Explora la version *hub* sugerida por
Hugo: asistente conversacional al centro y tres accesos por rol.

Es una alternativa, no un reemplazo. La version sitio corporativo vive en el repo
`tritec-demo` y sigue vigente.

## Paginas

- index.html             Home con el asistente al centro, dos puertas y flujo del hub
- acceso.html            Login con los tres roles (?rol=proveedor|cliente|tritec)
- panel-proveedor.html   Oportunidades, expediente con vigencias, postulaciones
- panel-cliente.html     Requerimientos, propuestas recibidas, documentos
- panel-tritec.html      Bandeja de consolidacion: cruces sugeridos, demanda y oferta
- requerimiento.html     Formulario por pasos
- confirmacion.html      Confirmacion con folio

## El asistente

Responde por coincidencia sobre el catalogo real de TRI-TEC (catalogo de servicios,
presentacion a General Motors y one-pager de proyectos de ingenieria). Ocho categorias:
tooling y automatizacion, mantenimiento industrial, personal especializado, seguridad y
EHS, proyectos de ingenieria y obra civil, mantenimiento predial, registros y
cumplimiento, y registro de proveedores.

Nunca afirma capacidad: la plantea en condicional y deriva a evaluacion. Si no encuentra
la necesidad en el catalogo, lo dice en lugar de inventar.

En produccion va con modelo y recuperacion sobre el catalogo cargado en el CMS. En la
maqueta no hay llamada a ningun modelo: meter una llave de API en un sitio publico la
expone.

## Advertencias

- Sin servidor. Ningun formulario envia ni almacena datos.
- El acceso no valida: cualquier dato abre el panel correspondiente.
- Los datos de los paneles son de ejemplo.
- Los KPIs provienen de los materiales de TRI-TEC y estan sujetos a validacion.
