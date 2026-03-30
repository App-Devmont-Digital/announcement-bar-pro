import React from "react";

const DeleteConfirmation = ({ ann = null, handleDelete, isLoading }) => {
  const content = ann && JSON.parse(ann?.content);
  return (
    <s-modal id="delete-modal" heading="Delete announcement?">
      <s-stack gap="base">
        <s-text>Are you sure you want to delete "{content?.name}"?</s-text>
        <s-text tone="caution">This action cannot be undone.</s-text>
      </s-stack>

      <s-button
        slot="primary-action"
        variant="primary"
        tone="critical"
        commandFor="delete-modal"
        command="--hide"
        onClick={handleDelete}
        loading={isLoading}
      >
        Delete
      </s-button>
      <s-button
        slot="secondary-actions"
        variant="secondary"
        commandFor="delete-modal"
        command="--hide"
      >
        Cancel
      </s-button>
    </s-modal>
  );
};

export default DeleteConfirmation;
