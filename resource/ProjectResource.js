
export const projectResource = async (projects) => {
   const allProjects = await Promise.all(
     projects.map(async (singleProject) => {
      //  const questions = await questionShortResource(singleProject.questions);
       return {
         id: singleProject._id,
         title: singleProject.title,
         description: singleProject.description,
         status: singleProject.status,
         project_id: singleProject.project_id,
         d_date: singleProject.deadline_date,
       };
     })
   );
 
   return allProjects;
 };



 export const projectShortResource = async (projects) => {
  const allProjects = await Promise.all(
    projects.map(async (singleProject) => {
     //  const questions = await questionShortResource(singleProject.questions);
      return {
        id: singleProject._id,
        name: singleProject.name,
        status: singleProject.status,
        project_id: singleProject.project_id,
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
         description: singleProject.description, 
         d_date: singleProject.deadline_date, 
         members: singleProject.members, 
      };
}
