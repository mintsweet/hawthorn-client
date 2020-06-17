import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { ModalProps } from 'antd/es/modal';

interface Props extends ModalProps {
  initData?: any;
  config: Array<{
    label: string | JSX.Element;
    name: string;
    component: React.ReactNode;
    required?: string | JSX.Element;
    rules?: any;
  }>;
  onSubmit: (values: any) => void;
}

export default function FormModal({
  initData = {},
  config,
  onSubmit,
  visible,
  ...props
}: Props) {
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  useEffect(() => {
    form.setFieldsValue(initData);
  }, [visible]);

  return (
    <Modal
      {...props}
      visible={visible}
      forceRender
      onOk={() => {
        form.validateFields().then((values) => onSubmit(values));
      }}
    >
      <Form form={form} {...layout}>
        {config.map((item) => {
          let rules = item.rules || [];
          if (item.required) {
            rules.unshift({
              required: true,
              message: item.required,
            });
          }
          return (
            <Form.Item
              key={item.name}
              label={item.label}
              name={item.name}
              rules={rules}
            >
              {item.component}
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
}