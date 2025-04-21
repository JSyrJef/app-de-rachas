# Sistema de Administración de Recompensas Comerciales Mediante Seguimiento de Rachas en TikTok

## Descripción

Este sistema es una aplicación diseñada para negocios que desean implementar promociones basadas en las rachas de TikTok. En TikTok, es común crear rachas con amigos donde, si se envían videos diariamente, se acumulan días en una racha. Este sistema permite a los negocios atraer clientes mediante promociones relacionadas con el número de días de racha que tengan los usuarios de TikTok.

**¿Cómo funciona?**

El negocio crea promociones basadas en el número de días de racha que el cliente tiene en TikTok. Por ejemplo, un restaurante mexicano puede ofrecer una promoción para clientes con una racha de entre 1 y 50 días. Al llegar al negocio, el cliente puede registrar su racha de TikTok y disfrutar de la promoción correspondiente.

**Roles y funciones:**
- **Administrador del negocio:** Puede crear, modificar, activar o desactivar promociones. También tiene la capacidad de registrar meseros y gestionar las promociones.
- **Mesero/Dependiente:** Solo puede registrar a los clientes que lleguen al negocio, pidiendo su nombre, apellido y usuario de TikTok.
- **Clientes:** Pueden aprovechar las promociones si no las han utilizado anteriormente. Si ya han usado una promoción, solo pueden elegir una nueva.

## Tecnologías

- **Django:** Framework backend para la gestión del sistema.
- **Axios:** Biblioteca para realizar solicitudes HTTP.
- **JWT:** Autenticación y autorización segura mediante tokens.
- **PostgreSQL:** Base de datos relacional para almacenar la información del sistema.
- **React Native:** Framework para desarrollar aplicaciones móviles nativas.
- **CSS (StyleSheet):** Estilos para la aplicación.

## Funcionalidades

- Crear promociones basadas en el número de días de racha de TikTok.
- Registrar clientes con su nombre, apellido y usuario de TikTok.
- Permitir a los meseros registrar las promociones que los clientes utilizan.
- Evitar que los clientes repitan promociones, pero permitiendo elegir nuevas.
- Modificar, activar y desactivar promociones como administrador.
- Administrar usuarios (meseros) que solo pueden registrar clientes.
