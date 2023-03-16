import Modal from "../../../components/UI/Modal";

const DeleteCategoryModal = (props) => {
   const {
      modalTitle,
      handleClose,
      deleteCategories,
      expandedArray,
      checkedArray,
      show,
   } = props;
   return (
      <Modal
         modalTitle={modalTitle}
         show={show}
         handleClose={handleClose}
         buttons={[
            {
               label: "no",
               color: "primary",
               onClick: () => {
                  alert("no");
               },
            },
            {
               label: "yes",
               color: "danger",
               onClick: () => deleteCategories(),
            },
         ]}
      >
         <h5>Expanded</h5>
         {expandedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
         ))}
         <h5>Checked</h5>
         {checkedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
         ))}
      </Modal>
   );
};

export default DeleteCategoryModal;
