
export const roleResource = async (roles) => {
   const allRoles = await Promise.all(
     roles.map(async (role) => {
      //  const questions = await questionShortResource(role.questions);
       return {
         id: role._id,
         name: role.name,
         slug: role.slug,
       };
     })
   );
 
   return allRoles;
 };

