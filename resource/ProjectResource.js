
export const projectResource = async (projects) => {
   const allProjects = await Promise.all(
     projects.map(async (singleUser) => {
      //  const questions = await questionShortResource(singleUser.questions);
       return {
         id: singleUser._id,
         name: singleUser.name,
         description: singleUser.description,
         status: singleUser.status
       };
     })
   );
 
   return allProjects;
 };

export const singleProjectResource = async(singleProject) => {
      return {
         id: singleProject._id, 
         name: singleProject.name, 
         status: singleProject.status, 
      };
}
