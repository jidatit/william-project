const Auctioncard = ({ image, model, category }) => {
	return (
		<div className="bg-white mb-2 hover:scale-105 transition-all rounded-[20px] overflow-hidden shadow-lg w-full lg:max-w-sm flex flex-col">
			<div className="relative w-full h-48">
				<img
					className="object-cover w-full h-full"
					src={
						image ||
						"https://images.unsplash.com/photo-1523275335684-37898b6baf30"
					}
					alt="Product Image"
				/>
			</div>
			<div className="p-4 flex-grow">
				<h3 className="text-lg font-medium mb-2 truncate">
					Model: {model || "Dacia Sandero"}
				</h3>
				<p className="text-md mb-4 truncate">
					Category: {category || "Hybrid"}
				</p>
				<div className="flex items-center justify-between">
					<span className="font-semibold text-sm text-[#ffe001] underline">
						More info
					</span>
					<button className="bg-[#ffe001] text-white font-bold py-2 px-4 rounded">
						Bid Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default Auctioncard;
