
// *** NO FUNCIONA (toDo). ***

// Para usar este script:

// Abre la consola del navegador (F12)
// Copia y pega el código
// Llama a la función con el email que quieras buscar:

// javascriptCopybuscarReposPorEmail('ejemplo@email.com');
// Algunas consideraciones importantes:

// Solo funciona con emails públicos asociados a cuentas de GitHub
// Solo muestra repositorios públicos
// Está sujeto a los límites de la API de GitHub
// Algunos usuarios pueden tener su email oculto por privacidad

// Alternativas para encontrar repositorios:

// Buscar directamente por nombre de usuario en GitHub
// Usar la búsqueda avanzada de GitHub
// Buscar por organización
// Usar el nombre completo del usuario



async function buscarReposPorEmail(email) {
  try {
      // Primero buscar el usuario por email
      const userResponse = await fetch(`https://api.github.com/search/users?q=${email}+in:email`);
      const userData = await userResponse.json();

      if (!userData.items || userData.items.length === 0) {
          return console.log('No se encontró ningún usuario con ese email');
      }

      // Para cada usuario encontrado, obtener sus repositorios
      for (const user of userData.items) {
          console.log(`\nRepositorios de ${user.login}:`);
          
          const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
          const repos = await reposResponse.json();

          if (repos.length === 0) {
              console.log('No tiene repositorios públicos');
              continue;
          }

          repos.forEach(repo => {
              console.log(`\nNombre: ${repo.name}`);
              console.log(`Descripción: ${repo.description || 'Sin descripción'}`);
              console.log(`URL: ${repo.html_url}`);
              console.log(`Lenguaje principal: ${repo.language || 'No especificado'}`);
              console.log(`Estrellas: ${repo.stargazers_count}`);
          });
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

// Ejemplo de uso:
buscarReposPorEmail('jose.pamplona@hotmail.es');

