import { getError } from "./error";


export  const fetchDomains = async({setDomains,getDomains,params})=>{
    try {
        const data = await getDomains(params).unwrap();
        console.log(data);
        setDomains(data?.domains);
    } catch (error) {
        getError(error)
    }
}
export  const fetchSubdomains = async({setSubdomains,id,getSubdomains,params})=>{
        try {
          const data = await getSubdomains({id,params}).unwrap();
          console.log(data);
          setSubdomains(data?.subDomains);
        } catch (error) {
          getError(error)
        }
      }

export  const fetchTopics = async({setTopics,id,getTopics,params})=>{
    try {
        const data = await getTopics({id,params}).unwrap();
        console.log(data);
        setTopics(data?.topics);
    } catch (error) {
        getError(error)
    }
}
export  const fetchSubtopics = async({setSubtopics,id,getSubtopics,params})=>{
        try {
          const data = await getSubtopics({id,params}).unwrap();
          console.log(data);
          setSubtopics(data?.subTopics);
        } catch (error) {
          getError(error)
        }
      }


   export   const fetchQuestions = async({getQuestions,setQuestions,query,id})=>{
        try {
          const params = `key=${query}`
          const data = await getQuestions({id,params}).unwrap();
          console.log(data);
          setQuestions(data?.questions);
        } catch (error) {
          getError(error)
        }
       }
        


