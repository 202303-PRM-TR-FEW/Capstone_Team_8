function Loading() {
	//https://css-tricks.com/single-element-loaders-the-spinner/
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: '#ffffff',
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 9999,
			}}
		>
			<div className='loader'></div>
			<div>
				<h1 className='text-2xl'>Please wait!</h1>
			</div>
		</div>
	);
}
export default Loading;
