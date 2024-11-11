import React, { useState } from "react";
import CustomMenu from "components/common/CustomMenu";
import zIndex from "@mui/material/styles/zIndex";

type WrappedComponentProps = {
  name: string;
};
function withMenu<T extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<T>,
  label: string,
  color: string,
  editEndpoint: string,
  deleteEndpoint: string,
  onSave?: () => void
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
      console.log("Capability name edited:", newName);
    };

    const handleDelete = () => {
      console.log("Capability deleted:", capabilityName);
      handleMenuClose();
    };

    return (
      <div style={{ position: "relative" }}>
        <WrappedComponent {...props} />

        <CustomMenu
          anchorEl={anchorEl}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
          onEdit={() => handleEdit(capabilityName)}
          onDelete={() => {
            handleDelete();
            onSave && onSave();
          }}
          capabilityName={capabilityName}
          label={label}
          color={color}
          onSave={(name) => {
            handleEdit(name);
            onSave && onSave();
          }}
          editEndpoint={editEndpoint}
          deleteEndpoint={deleteEndpoint}
          menuStyle={{ left: "90%",marginY:-0.5}}
        />
      </div>
    );
  };
}

export default withMenu;
