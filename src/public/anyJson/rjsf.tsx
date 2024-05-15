import React, { FC, useState } from "react"
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';

const schema: RJSFSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    done: {
      type: 'boolean',
    },
  },
};

const formData = {
  title: 'First task',
  done: true,
};

export default () => <Form
  schema={schema}
  formData={formData}
  validator={validator}
/>