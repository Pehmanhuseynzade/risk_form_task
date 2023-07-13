import React, { useEffect, useState } from 'react'
import { getAlldatas, getdatasbyID, deleteDatas, postDatas } from '../../../api/httpsrequests';
import { Table, Button, Modal, Form, Input } from 'antd';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Helmet } from "react-helmet";

function Tablepage() {
  const [info, setinfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editinginfo, setEditinginfo] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const userinfos = async () => {
    try {
      const infoData = await getAlldatas();
      setinfo(infoData);
    } catch (error) {
      console.error('Failed to retrieve Datas entries:', error);
    }
  };

  useEffect(() => {
    userinfos();
  }, [info]);

  const handleOpenModal = (userdatas) => {
    setEditinginfo(userdatas);
    setModalOpen(true);
    form.setFieldsValue({
      firstName: userdatas?.firstName || '',
      lastName: userdatas?.lastName || '',
      email: userdatas?.email || '',
      confirmEmail: userdatas?.confirmEmail || '',
      phone: userdatas?.phone || '',
      rating: userdatas?.rating || '',
    });
  };

  const handleEditData = (record) => {
    Swal.fire({
      title: "Edit Record",
      html: `
        <input id="edit-firstName" type="text" placeholder="First Name :" value="${record.firstName}" class="swal2-input" />
        <input id="edit-lastName" type="text" placeholder="Last Name" value="${record.lastName}" class="swal2-input" />
        <input id="edit-email" type="text" placeholder="Email" value="${record.email}" class="swal2-input" />
        <input id="edit-confirmEmail" type="text" placeholder="Confirm Email" value="${record.confirmEmail}" class="swal2-input" />
        <input id="edit-phone" type="number" placeholder="Phone" value="${record.phone}" class="swal2-input" />
        <input id="edit-rating" type="number" placeholder="Rating" value="${record.rating}" class="swal2-input" />

      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: () => {
        const editedfirstName = Swal.getPopup().querySelector("#edit-firstName").value;
        const editedlastName = Swal.getPopup().querySelector("#edit-lastName").value;
        const editedemail = Swal.getPopup().querySelector("#edit-email").value;
        const editedconfirmEmail = Swal.getPopup().querySelector("#edit-confirmEmail").value;
        const editedphone = Swal.getPopup().querySelector("#edit-phone").value;
        const editedrating = Swal.getPopup().querySelector("#edit-rating").value;


        if (!editedfirstName || !editedlastName || !editedemail || !editedconfirmEmail || !editedphone || !editedrating) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }
        return {
          firstName: editedfirstName,
          lastName: editedlastName,
          email: editedemail,
          confirmEmail: editedconfirmEmail,
          phone: editedphone,
          rating: editedrating,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const editedData = result.value;
        console.log("Edited Data:", editedData);

        try {
          await axios.put(`http://localhost:8989/api/form/${record._id}`, editedData);
        } catch (error) {
          console.error(error);
          // Handle the error here
        }
      }
    });
  };

  const handleCloseModal = () => {
    setEditinginfo(null);
    setModalOpen(false);
    form.resetFields();
  };

  const handleDeleteinfo = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDatas(id);
          setinfo(info.filter((deleting) => deleting._id !== id));
          Swal.fire('Deleted!', 'Informations entry has been deleted.', 'success');
        } catch (error) {
          console.error('Failed to delete informations entry:', error);
        }
      }
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();


    const newInfo = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      confirmEmail: values.confirmEmail,
      phone: values.phone,
      rating: values.rating,
    };

    await postDatas(newInfo);

    handleCloseModal();
    // }
    await userinfos();

  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Confirm Email',
      dataIndex: 'confirmEmail',
      key: 'confirmEmail',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (text, record) => (
        <Link to={`details/${record._id}`}>
          <button
            style={{
              background: "#1677ff",
              color: "white",
              width: 80,
              height: 40,
              fontFamily: "chillax-regular",
            }}
          >
            Detail Page
          </button>
        </Link>
      ),
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "edit",
      render: (text, record) => (
        <Button
          style={{
            background: "#1677ff",
            color: "white",
            width: 80,
            height: 40,
            fontFamily: "chillax-regular",
          }}
          onClick={() => {
            handleEditData(record)
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDeleteinfo(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginLeft: '220px' }}>
        <div style={{ marginBottom: '16px' }}>
          <button type="primary" onClick={() => handleOpenModal(null)} style={{ marginLeft: '550px', marginTop: '60px' }}>
            Add
          </button>
        </div>
        <div style={{ width: '60%', margin: '30px auto' }}>
          <Table columns={columns} dataSource={info} />

          <Modal
            visible={modalOpen}
            title={editinginfo ? 'Edit informations Entry' : 'Add New Informations'}
            onCancel={handleCloseModal}
            onOk={handleSubmit}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Confirm Email"
                name="confirmEmail"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please enter' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Tablepage