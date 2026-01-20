import { useParams } from 'react-router';

function NewsByTheme() {
  const { tema } = useParams();
  return (
    <div>
      <div>{tema}</div>
    </div>
  );
}

export default NewsByTheme;
