import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ModalForm = ({render}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsShowPwd((last) => !last);

  return render({isOpen, setIsOpen, isShowPwd, setIsShowPwd, handleClose, handleShow});
};

ModalForm.propTypes = {
  render: PropTypes.func.isRequired
};

export default ModalForm;
