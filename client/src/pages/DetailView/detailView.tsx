// src/components/DetailView/detailView.tsx
import React, { useState } from "react";
import { ModalSaveChange } from "../../components/Modals/ModalSaveChange/modalSaveChange";
import { PageType } from "../../types/types";
import "./detailView.css";
import { useLocation } from "react-router-dom";
import { detailsType } from "../../dictionaries/detailsType";
import { Category, Store, User } from "../../Interfaces/interfaces";

// @ts-ignore
interface DetailViewProps<T> {
  pageType: PageType;
}

export const DetailView = <T extends User | Store | Category>({
  pageType,
}: DetailViewProps<T>) => {
  const location = useLocation();
  const { item: initialData } = location.state || {};
  const [item, setItem] = useState(initialData);
  const [itemData, setItemData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const details = detailsType[pageType];

  const hasChanges = itemData.active !== item.active;

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setItemData({ ...itemData, active: checked });
  };

  const handleSave = () => {
    if (hasChanges) {
      setIsModalOpen(true);
    }
  };

  const handleUpdateSuccess = (updatedData: T) => {
    setItem(updatedData);
    setItemData(updatedData);
    setIsModalOpen(false);
  };

  return (
    <div className="detailView-container">
      <div className="detailView-header">
        <h2 className="detailView-title">{pageType} Details</h2>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`detailView-save ${hasChanges ? "active" : "inactive"}`}
        >
          Update and Save
        </button>
      </div>
      <div>
        {details.fields.map((field) => (
          <div key={field.name} className="detailView-field">
            {field.label}:
            <input
              className="detailView-input"
              type={field.type}
              name={field.name}
              value={String(itemData[field.value])}
              readOnly
            />
          </div>
        ))}
        <div className="detailView-field">
          Active:
          <p className={itemData.active ? "active-yes" : "active-no"}>
            {itemData.active ? "Yes" : "No"}
          </p>
          <input
            className="detailView-input"
            type="checkbox"
            name="active"
            checked={itemData.active}
            onChange={handleActiveChange}
          />
        </div>
      </div>

      {details.hesStore && (item as any).employeeFields?.stores.length > 0 && (
        <div className="detailView-array-info">
          <h3>Stores Managed</h3>
          <div className="detailView-array-container">
            {(item as any).employeeFields?.stores.map((store: any) => (
              <div key={store._id} className="detailView-array-item">
                <p>Store ID: {store._id}</p>
                <p>Name: {store.name}</p>
                <p>Branch: {store.branchName}</p>
                <p>Address: {store.address}</p>
                <p>Active: {store.active ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {details.hesProduct && (item as any)?.products.length > 0 && (
        <div className="detailView-array-info">
          <h3>Products Managed</h3>
          <div className="detailView-array-container">
            {(item as any)?.products.map((product: any) => (
              <div key={product._id} className="detailView-array-item">
                <p>Product ID: {product._id}</p>
                <p>Store ID: {product.store}</p>
                <p>Name: {product.name}</p>
                <p>Description:{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>In Stock: {product.numberInStock}</p>
                <p>Active: {product.active ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ModalSaveChange
        isOpen={isModalOpen}
        type={pageType}
        data={itemData}
        onConfirm={handleUpdateSuccess}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
