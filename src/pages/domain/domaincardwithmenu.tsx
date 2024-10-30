import DomainCard from './card-domain';
import withMenu from '../capability/withmenu';



export default (props: any) => {
    const DomainCardWithMenu = withMenu(DomainCard, 'Domain', "black", `${process.env.REACT_APP_API_URL}domain/${props.id}`, `${process.env.REACT_APP_API_URL}domain/${props.id}`,props.onSave);
    return (  
    <DomainCardWithMenu
      {...props}  
    />)
};