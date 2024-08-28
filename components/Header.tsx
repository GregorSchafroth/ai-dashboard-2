import Image from 'next/image';
import logo from '../img/logo.png';

const Header = () => {
  return (
    <header>
      <h1 className='text-4xl m-4 flex items-center  gap-2'>
        <Image src={logo} alt='Swiss AI Automation' width={40} />
        Swiss AI Automation Dashboard
      </h1>
    </header>
  );
};

export default Header;
