import React, { useState } from 'react';
import CustomMenu from 'components/common/CustomMenu';


type WrappedComponentProps = {
    name: string;
  };
  function withMenu<T extends WrappedComponentProps>(
    WrappedComponent: React.ComponentType<T>,
    label: string, 
    color: string,
    editEndpoint: string,    
    deleteEndpoint: string 
  ) {
    return function EnhancedComponent(props: T) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [capabilityName, setCapabilityName] = useState(props.name);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = (newName: string) => {
      setCapabilityName(newName);
      console.log('Capability name edited:', newName);
    };

    const handleDelete = () => {
      console.log('Capability deleted:', capabilityName);
      handleMenuClose();
    };

    return (
      <div style={{ position: 'relative' }}>
        <WrappedComponent {...props} />

        <CustomMenu
          anchorEl={anchorEl}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
          onEdit={() => handleEdit(capabilityName)}
          onDelete={handleDelete}
          capabilityName={capabilityName}
          label={label}
          color={color}
          onSave={(name) => handleEdit(name)}
          editEndpoint={editEndpoint}
          deleteEndpoint={deleteEndpoint}
        />
      </div>
    );
  };
}

export default withMenu