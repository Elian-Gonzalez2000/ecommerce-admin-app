import React from "react";
import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
   const {
      show,
      handleClose,
      modalTitle,
      categoryName,
      setCategoryName,
      parentCategoryId,
      setParentCategoryId,
      categoryList,
      handleCategoryImage,
   } = props;

   return (
      <Modal
         show={show}
         handleClose={handleClose}
         onHide={handleClose}
         modalTitle={modalTitle}
      >
         <Input
            value={categoryName}
            placeholder={"Category Name"}
            onChange={(e) => setCategoryName(e.target.value)}
         />

         <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
         >
            <option>Select Category</option>
            {categoryList.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.name}
               </option>
            ))}
         </select>
         <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
         />
      </Modal>
   );
};

export default AddCategoryModal;
