import { BoardCardModal, ModalWindow } from "..";
import { BoardCardType } from "../../../types/card";
import { Button, Tag } from "../../atoms";
import { VerticalDotsIcon } from "../../icons";
import styles from "./BoardCard.module.scss";
import { MouseEvent, useState } from "react";

export const BoardCard: React.FC<BoardCardType> = ({ title, text, tags }) => {
	const [showModal, setShowModal] = useState(false);

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		console.log("ahoj");
	};

	const linkRegex = /(https?\\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;

	const description = text.replace(linkRegex, "");

	console.log("tags", tags);

	// "download_url": "https://asana-user-private-us-east-1.s3.amazonaws.com/assets/1206744696975655/1206824166152368/1a8b3fdb61be29256c6a035b4ceed0e7?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLWVhc3QtMSJIMEYCIQDsNDIubqFo3b9%2BN2zVf9tUk6UwhFguaRds2NrbIVGS8wIhANiHQYXsnWWmDaZqkbarik0SZAK89hk0o%2BHRpTGf4rwSKrIFCGQQABoMNDAzNDgzNDQ2ODQwIgzwV3EXu59X9bJ4%2FBUqjwW2jMpqGj2tHQjKse8BhtBGLWJackq4kjyA1kdn6MJ5VxWaclCfxbvfXVJ8OTuM%2BqiIXv2D3IgQI4tpG%2B1G6t%2BWhyYbofYWo3CCRO8klN%2Bs19rJ%2B4r2wLLk5B5nheqyfOrCJmix9LM5X5kNN85JRhxR%2Fdz485ebio0XaqSqNGnOhixdiqIzUntm2PV8g3IqHJJtXRANCx0dNQkvSEUcxc73xgMWs%2BmdsOwlAb4V026G8QaIo1IXS%2BS2ew4QtfkxPHqU99j06EfiKV%2FDO3V6IDmcVThEA7gD1fA1GsPvcPrCo61fe6q0cCdNBGwz8yVF4oyDmkJl7Df9OZRxJu6UMzFBIZHmpmhfZYWEFHHxtr1rZjLCeRzLZlYS%2BigXz67A1Zw1nOfezzzBD8H9ApKLEXvDMDROXiJykQ11FggKus0aJ%2FYQmXQyAIaQ88YYwCKBssJlf%2B2IxnCj4kfQjinYd0Z3pw7dF8wNOlxYHEVE4WcYikyQncf3GBWqx6pOPwR3c0tdpN4uCS55uKUqMLZWrligvA6jXIznj785UB562TzbAnFRBrOe8qD%2Fdtz2ZfoHH7ZrRhZ%2FE5dur7eVcu3gYVTrL1QTdPsFcDMcPAJ5cKwFBRDjL5MRdEUHEwjJpBdAd5GY%2BCSc8P3PALCZdHZg9jK3XziYsUQ9E4NjolsC4jmyiOB8WhYpdT4n8u7Y2A7CR2GdVyKYreHqqTp3ADKIT3TD143pi6U1vbRbl1d7zSUyMAxJKD%2BHhLfqjESGzT0hz9X8SspXgZ%2FtAFF0j%2Fqdnv0Elwk5sjMUF2G9ycQwPbmIDApBLlx4GgMiUizmqrD%2B2NK8A4uGG0UyHuWXSjam%2F7XsxaFqbm3G4LbtkEUCuegqMMPkx68GOrABObSY5SLPuKs%2B2pVhK6Ja8fCP46cE7eURHT9JoEOP1fQW5vknWTQBNMUBkQxVMF39%2FMA9W5WV0QcE5H91GTs4Pqy0Y6an%2BRcVBq%2FhKckXW4WtJbowZyLvjrMt3WgUyaxUIJk%2BL6E1XPV8HbftrfffbFUkowrqF2jArcrL2WuVpk5vSEmdp15KNG9PKqDnfTqJfNyLWDqaJNxsFQ9KIJ4FGzI3TN9LveBd905zcOtyTBg%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240313T191637Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=ASIAV34L4ZY4D7YUAF5Z%2F20240313%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c51e12c81ba9ffaa72d93f6b7b2fcb6b108f61ae22ae250aa55eb9e8007d1129#_=_"

	// console.log(imgSrc);

	return (
		<>
			<div className={styles.card} onClick={() => setShowModal(true)}>
				{/* {imgSrc && (
					<img
						src={"https://asana-user-private-us-east-1.s3.amazonaws.com/assets/1206744696975655/1206824166152368/1206824166152369.rk9Ls8DJiRB5AC2SIzmZ_height640.png?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGgaCXVzLWVhc3QtMSJIMEYCIQDlQ40%2B1qtbMnJLq513w1sTxvaudf0xRvAWtjUGlUBR%2FAIhAKPZW%2FH1TzixEucEw3ZsAtuBFSvQNjpHq%2B4EjHJ4BLquKrAFCHEQABoMNDAzNDgzNDQ2ODQwIgzyRbqj9jxCHwqXZIsqjQUknN3kxszuBx4pgleooW%2FIQy0MnqaGuwVZodOM9VuBc13rDFPObobQWBiC5DczTlRnGQB%2FfCRhaCnc7J4wmk7js3mOTFqG7834uzl%2FEOKSPbIpjaE1o1vYFljY13Wn5ZYsJCMnLjXK8WHtB7ksGJu4CnCl9sEA3FG%2F9VL14oacGma3CWAUjBdVmfH9jRtitUjkdWhIWspARP%2BZiE%2FvEAmV%2FiBYCM%2BzzbXOj7EbfDoUJyl4FzP5A1Al4p1LcVTrVGXwyhy%2B1ol7pbXsSIkN5q2pIB68tcs9jjR7mYICcw4uo%2BDnpdmxGIwbHfTmxLciFpv4AmRz%2BebJ%2ByZzNUwWpOxrqf2KwA3YM4jqbMqCBBGe3dYGiFDGp2gvpQ6%2BuJ04W3gKLH30xA3uCClS4ufWL6GhK7zIZjjlOatYS0tY%2BN2oAJJe82kziQbbrGC0GWPXCv%2BNb03oFVoBIQZOjcoEwRM5lX5Kjd5BgtEheQhWLBZR%2B%2BhEFl0bTz3GQCOU64nJBDoI33afJB7KUZ1bXeF8kZbCTXRFl6sBdQgVctc%2FVtmPZsqLY4Yz%2BvsrFkvN6kKEJULMIvMMG0J0TloTtTqjG7LCH5%2Fa6UA7bQMOFvhaL%2BlTM%2BPgvO3OviAYEDW3C2dvljQdNkCMV4mt5fTi8%2BXO4Cy9VSBmIgLoXWVcIMAqqbComZ2gsIl0KPBmHwgPyA2U5u%2FCTdr44tGDSd5hCm4SZGplHooG9kWz2i23WB%2FWDc3LZnb4PXUJF0KhRzGUx0ZoO8eDptSknMbp5Dcrt0cvuhjcNM4fzynM1mesorykD93H5h7d3Pspn64ZXt5W0gxf%2FMqK7lASteN3FXNSTjr7xzyYC%2Bf3gwTljJPPBj6yMTCr3sqvBjqwAbd0x8AVfxQply8nmFl%2Bsm70GTJYiC0hwKDC%2BEunD%2BNj7YzIoH2XM2MywJ4WZWfuRtcnKGLSVo1E21AVw8BkxWFgO5meYiJWe1hRyB3zH%2FMzg9JDOICex6OhNxC4I%2FH8pwW8V%2BPlrEQB%2F9R0LNGdJ5R6mEKl167pnaGrIqw4QBhg4%2Fu2DcB4iJPSwjx7XMp4z4PtK9%2FCFjiU5zxD8PrJ8Q7ZejG8l8eTJviBlepwnTM8&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240314T090354Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Credential=ASIAV34L4ZY4GJK44PCJ%2F20240314%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f2fd02c2cd948ebdb9d9355c0968b724a4199d556f5301ec192c5f33a60acc45#_=_"}
						alt="img"
						className={styles.backgroundImage}
					/>
				)} */}
				{tags.map((tag) => (
					<Tag key={tag.gid} text={tag.name} />
				))}
				<div className={styles.description}>
					<div className={styles.text}>
						<h5>{title}</h5>
						<p>{description}</p>
					</div>
					<Button
						icon={<VerticalDotsIcon />}
						onClick={(event) => event && openMenu(event)}
						className={styles.icon}
					/>
				</div>
			</div>
			{showModal && (
				<ModalWindow close={() => setShowModal(false)}>
					<BoardCardModal
						title={title}
						text={description}
						tags={tags}
					/>
				</ModalWindow>
			)}
		</>
	);
};
