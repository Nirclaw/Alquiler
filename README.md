# Proyecto Alquiler coche

**Clonar el repositorio:** Comienza clonando el repositorio de TacticalInventory en tu máquina local. Abre una terminal y ejecuta el siguiente comando:

**Requisitos previos:** Asegúrate de tener instalado Node.js y npm en tu sistema.

git clone https://github.com/Nirclaw/TacticalInventory.git

1. **Configurar variables de entorno:** Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes encontrar un ejemplo de las variables requeridas en el archivo `.env.example`.

  las variables vienen por defecto en el proyecto como usuario root y sin contraseña

  ```js
ALTAS_USUARIO="Nirclaw"
ATLAS_PASS="EDTXMFUhkURsfs7g"
ATLAS_DB="db_campus_sucursal"
SERVER = {"hostname":"127.10.10.10","port":5100}
PASSWORD = "Nicolas1234567890"
mongodb+srv://Nirclaw:EDTXMFUhkURsfs7g@cluster0.hoapju2.mongodb.net/
  ```

2. **Instalar las dependencias**: El proyecto ya cuenta con un archivo llamado `package.json`, en el cual se encuentran especificadas todas las dependencias necesarias para que el proyecto funcione de manera óptima. Por lo tanto, para instalar dichas dependencias, simplemente ejecuta el siguiente comando:

  ```js
  npm install
  ```

  ###### **nota:** el proyecto trae una carpeta con la base de datos llamada `db` y dentro de esa carpeta contiene 3 archivos uno llamado consultas, db y insetData el db es para crear la base de datos en mongo y el insertar es un muestra de como deberia insertar los datos y el de consultas son el de todas las consultas del proyecto

   

  Este comando leerá el archivo `package.json` y descargará e instalará automáticamente todas las dependencias listadas en el proyecto. De esta manera, tendrás todo lo necesario para que el proyecto se ejecute correctamente.

3. **Iniciar el servidor:** Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor con el siguiente comando:

   ```
   npm run dev
   ```



1. ## Uso

   1. Para comenzar a utilizar la aplicación, primero necesitas obtener un token de autenticación. Para hacerlo, sigue los siguientes pasos utilizando la extensión "Thunder Client" en tu entorno de desarrollo:

      - Abre la extensión **"Thunder Client"** en tu entorno de desarrollo.

      - Crea una nueva solicitud **GET** utilizando la siguiente URL:

         URL: `http://127.10.10.10:5100/token/nombrecoleccion`

         las colecciones existentes son 

         ​	- cliente

         ​	- sucursal

         ​	- sucursalAutomovil

         ​	- reserva

         ​	- alquiler

         ​	- automovil

         ​	- empleado

      - Ejecuta la solicitud haciendo clic en el botón correspondiente en "Thunder Client".

      - Espera la respuesta de la solicitud. En la respuesta, recibirás un **token** de autenticación.

      Una vez que hayas obtenido el token, guárdalo de manera segura, ya que será necesario para llevar a cabo las siguientes operaciones dentro de la aplicación. Puedes utilizar este token como una especie de "credencial" que te permitirá acceder a las funcionalidades y recursos protegidos de la aplicación te en cuenta que el token tiene una duracion de 30min en dado caso que el token expire repetir el mismo proceso.

      Recuerda mantener el token privado y no compartirlo con nadie más, ya que otorga acceso autorizado a la aplicación en tu nombre. Si en algún momento sospechas que el token ha sido comprometido, puedes solicitar uno nuevo siguiendo el mismo proceso descrito anteriormente.

   2. Utilizar endpoints con el token: Ahora que tienes el token de autenticación, asegúrate de incluirlo en el encabezado (header) de tus solicitudes para verificar la autenticidad del usuario. Además, sigue el orden y tipo de dato exacto para los parámetros requeridos en cada endpoint. Respetar este orden y tipo de dato es fundamental para evitar errores de parámetros de entrada.



## IMPORTANTE

El generar el token de una coleccion solo se podra usar para la coleccion que generaste si deseas usar otra coleccion deberas generar nuevamente un token con el nombre correspondiente de la coleccion :) 



### ENDOPINDS



------

**GET**

**Coleccion cliente**

Mostrar todos los clientes registrados en la base de datos.

http://127.10.10.10:5100/clientes/

------

**GET**

**Coleccion automoviles **

Obtener todos los automóviles disponibles para alquiler

http://127.10.10.10:5100/automoviles/capacidad

---------------------------

**GET**

**Coleccion alquiler **

Listar todos los alquileres activos junto con los datos de los clientes relacionados.

http://127.10.10.10:5100/alquiler/

------------------

**GET**

**Coleccion reserva **

mostrar reservas pendientes con datos clientes y el auto reservado

http://127.10.10.10:5100/alquiler/

--------------

**GET**

**Coleccion alquiler**

obtener los detalles del alquiler con un id_alquiler especifico

enviar el dato de la siguiente manera

```json
{
  "id":3
}
```

--------------------

**GET**

**Coleccion alquiler**

obtener los detalles del alquiler con un id_alquiler especifico

http://127.10.10.10:5100/alquiler/detalles

enviar el dato de la siguiente manera

```
{
  "id":3
}
```



--------------

**GET**

**Coleccion empleados**

listar los empleado con el cargo vendedor

http://127.10.10.10:5100/empleados/vendedor

------------

**GET**

**Coleccion alquiler**

mostrar la cantidad total de autos disponibles en cada sucursal

http://127.10.10.10:5100/sucursal/cantidad-coches-sucursal

------------

**GET**

**Coleccion alquiler**

obtener el costo total de un alquiler especifico

http://127.10.10.10:5100/alquiler/costo

```
{
  "id":3
}
```

------------------------------

**GET**

**Coleccion cliente**

listar los clientes con el dni especifico

http://127.10.10.10:5100/cliente/id

```
{
  "id":3
}
```

---------------

**GET**

**Coleccion automovil**

mostrar todos los automoviles con una capacidad mayor a 5 personas

http://127.10.10.10:5100/automovil/capacidad

---------------------

**GET**

**Coleccion alquiler**

obtener los detalles del alquiler que tiene una fecha de inicio en "2023-07-05"

http://127.10.10.10:5100/alquiler/fecha

```
{
  "fecha":"2023-07-05"
}
```

------------------

**GET**

**Coleccion reserva**

listar las reservas pendientes por un cliente

http://127.10.10.10:5100/reserva/pendientes

```
{
  "id":3
}
```

--------------------

**GET**

**Coleccion empleados**

mostratr los empleados con el cargo de gerente o asistente

http://127.10.10.10:5100/empleados/cargo/vendedor

-----------------

**GET**

**Coleccion alquiler**

obtener los datos de los clientes que realizaron al menos un alquiler

http://127.10.10.10:5100/alquiler/clientes-registrados

--------------------

**GET**

**Coleccion automoviles**

listar los automoviles por marca y modelo

http://127.10.10.10:5100/automoviles/marca-modelo

------------------

**GET**

**Coleccion sucursal**

mostrar la cantidad de coches en cada sucursal junto a su direccion

http://127.10.10.10:5100/sucursal/

------------

**GET**

**Coleccion alquiler**

obtener la cantidad total de alquileres en la base de datos

http://127.10.10.10:5100/alquiler/cantidad-alquileres

---------------

**GET**

**Coleccion alquiler**

listar alquileres con fecha de inicio "2023-07-05 y 2023-07-10"

http://127.10.10.10:5100/alquiler/alquiler-fecha-inicio-fin

```
{
"fecha_inicio":"2023-07-05",
"fecha_fin":"2023-07-10"
}
```











