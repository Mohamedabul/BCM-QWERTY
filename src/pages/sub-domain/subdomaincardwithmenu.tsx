import withMenu from "pages/capability/withmenu";
import SubDomainCard from "./card-sub-domain";



export default  (props: any) => {
    const SubDomainCardWithMenu = withMenu(SubDomainCard, "subdomain", "black", `${process.env.REACT_APP_API_URL}subdomain/${props.id}`, `${process.env.REACT_APP_API_URL}subdomain/${props.id}`);
    return (
    <SubDomainCardWithMenu
      {...props}
      color="black"
      editEndpoint={`${process.env.REACT_APP_API_URL}subdomain/${props.id}`}       
      deleteEndpoint={`${process.env.REACT_APP_API_URL}subdomain/${props.id}`}    
    />)
};