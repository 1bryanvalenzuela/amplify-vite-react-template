import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

export const DefaultStorageManagerExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['csv/*']}
      path="public/"
      maxFileCount={1}
      isResumable
    />
  );
};

export default DefaultStorageManagerExample;