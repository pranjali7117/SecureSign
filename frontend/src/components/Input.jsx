
const Input = ({ icon, ...props }) => {
	return (
		<div className='relative flex items-center'>
			<span className='absolute left-3'>{icon}</span>
			<input
				{...props}
				className='w-full border border-gray-300 px-12 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
			/>
		</div>
	);
};
export default Input;
