# PS_opinion_manager
BackEnd (Node.js, Express y MongoDB) <br>
module: nodemon "npm run dev"
## Función
Esta conformado por 4 collections, todas funcionan con token excepto SingUp, LoginEmail y LoginUsername:
1. **Register User**: 
    - singUP: url -> http://localhost:3000/comments/v1/user
2. **Login**:
    - loginEmail: url -> http://localhost:3000/comments/v1/auth/loginEmail
    - loginUsername: url -> http://localhost:3000/comments/v1/auth/loginUsername
    - editProfile: url -> http://localhost:3000/comments/v1/user/"idUser" 
3. **Publications**:
    - createPublication: url -> http://localhost:3000/comments/v1/publication
    - seeAll: url -> http://localhost:3000/comments/v1/publication
    - putMyPost: url -> http://localhost:3000/comments/v1/publication/updateMyPost/"idPublication"
    - deleteMyPost: url -> http://localhost:3000/comments/v1/publication/deleteMyPost/"idPublication"
4. **Comments**: 
    - addComment: url -> http://localhost:3000/comments/v1/publication/addComment/"idPublication"
    - editComment: url -> http://localhost:3000/comments/v1/publication/"title"/"idComment"
    - deleteMyComment: url -> http://localhost:3000/comments/v1/publication/"title"/"idComment"

## Qué debo hacer?
Este sistema tiene como objetivo crear un sistema de gestión de opiniones similar a las
publicaciones de Facebook, con funcionalidades específicas centradas en la interacción y
expresión de opiniones por parte de los usuarios.
Deberá contener lo siguiente:

- Inicio de sesión y Perfil de usuario: los usuarios podrán crear cuentas y acceder al
sistema mediante un proceso de inicio de sesión seguro. El login debe poder realizarlo
mediante correo o nombre de usuario, y contraseña. Podrán editar su perfil, nombre de
usuario, contraseña (ingresar la anterior), etc.
No se permitirá la eliminación de perfiles para garantizar la integridad de las opiniones y
comentarios.

- Gestión de publicaciones: los usuarios podrán crear publicaciones para expresar sus
opiniones. Cada publicación contendrá un título, categoría y texto principal.
Se permitirá la edición de publicaciones existentes para corregir errores o actualizar la
información. Los usuarios podrán eliminar sus propias publicaciones, pero no las de otros.

- Comentarios: otros usuarios podrán comentar en las publicaciones para expresar sus
opiniones o agregar información adicional.
Los comentarios podrán ser editados para corregir posibles errores, sólo podrá editar sus
propios comentarios.
Se permitirá a los usuarios eliminar sus propios comentarios, pero no los comentarios de
otros usuarios.
