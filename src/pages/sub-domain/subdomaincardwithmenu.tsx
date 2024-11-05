import withMenu from "pages/capability/withmenu";
import SubDomainCard from "./card-sub-domain";



export default  (props: any) => {
  let SubDomainCardWithMenu;
    if(props.isEditable){
      SubDomainCardWithMenu = withMenu(SubDomainCard, "subdomain", "black", `${process.env.REACT_APP_API_URL}subdomain/${props.id}`, `${process.env.REACT_APP_API_URL}subdomain/${props.id}`,props.onSave);
    }
    else{
      SubDomainCardWithMenu = SubDomainCard
    }
    return (
    <SubDomainCardWithMenu
      {...props}
      color="black" 
    />)
};