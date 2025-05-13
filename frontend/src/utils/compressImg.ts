export const compressImg = (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		img.onload = () => {
			const MAX_SIZE = 800;
			let { width, height } = img;

			if (width > height && width > MAX_SIZE) {
				height *= MAX_SIZE / width;
				width = MAX_SIZE;
			} else if (height > MAX_SIZE) {
				width *= MAX_SIZE / height;
				height = MAX_SIZE;
			}

			canvas.width = width;
			canvas.height = height;
			ctx?.drawImage(img, 0, 0, width, height);
			canvas.toBlob(
				(blob) => {
					if (blob) {
						const compressedFile = new File(
							[blob],
							file.name.replace(/\.\w+$/, ".webp"),
							{
								type: "image/webp",
								lastModified: Date.now(),
							}
						);
						resolve(compressedFile);
					} else {
						reject(new Error("Failed to compress image."));
					}
				},
				"image/webp",
				0.8
			);
		};

		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
};
