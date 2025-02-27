function Header() {
  return (
    <div className='p-4 px-5 shadow-sm flex justify-between items-center'>
      <img src="/logo2.png" alt="Logo" className='h-18 w-20 object-contain  scale-180 ml-5' />
      <button className='bg-black text-white rounded-md p-2 hover:scale-105  font-bold text-xl text-center hover:text-amber-100 cursor-pointer'>
        Sign In
      </button>
    </div>
  );
}

export default Header;