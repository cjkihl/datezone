import { ImageResponse } from "@vercel/og";
import { z } from "zod";
export const runtime = "edge";

const ogSchema = z.object({
	date: z.string().optional(),
	description: z.string().optional(),
	heading: z.string(),
});

export async function GET(req: Request) {
	try {
		const geist = await fetch(
			new URL("../../../assets/Geist.ttf", import.meta.url),
		).then((res) => res.arrayBuffer());

		const url = new URL(req.url);
		const urlParamsValues = Object.fromEntries(url.searchParams);
		const validParams = ogSchema.parse(urlParamsValues);

		const { heading, description, date } = validParams;
		const trueHeading =
			heading.length > 140 ? `${heading.substring(0, 140)}...` : heading;

		return new ImageResponse(
			<div
				style={{
					background:
						"radial-gradient(circle 230px at 0% 0%, #000000, #000000)",
					color: "white",
					fontFamily: "Geist",
				}}
				tw="flex w-full h-full relative flex-col"
			>
				<div
					style={{
						border: "1px solid rgba(32, 34, 34, 0.5)",
						borderRadius: "10px",
					}}
					tw="flex w-full h-full relative"
				>
					<div
						style={{
							background: "#c7c7c7",
							borderRadius: "100px",
							filter: "blur(35px)",
							height: "120px",
							left: "0%",
							opacity: 0.21,
							top: "18%",
							transform: "rotate(50deg)",
							width: "350px",
						}}
						tw="absolute"
					/>

					<div
						style={{
							gap: "14px",
							position: "relative",
							zIndex: 999,
						}}
						tw="flex flex-col w-full relative h-full p-8"
					>
						<div
							style={{
								alignItems: "flex-start",

								background:
									"url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuZGV2L3N2Z2pzIiB2aWV3Qm94PSIwIDAgODAwIDgwMCIgd2lkdGg9IjgwMCIgaGVpZ2h0PSI4MDAiPjxnIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2U9ImhzbGEoMCwgMCUsIDEwMCUsIDEuMDApIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjUiPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB4PSIwIiB5PSIwIiBvcGFjaXR5PSIwLjE1Ij48L3JlY3Q+PGNpcmNsZSByPSIxMC44NTUyNjMxNTc4OTQ3MzYiIGN4PSIwIiBjeT0iMCIgZmlsbD0iaHNsYSgwLCAwJSwgMTAwJSwgMS4wMCkiIHN0cm9rZT0ibm9uZSI+PC9jaXJjbGU+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHg9IjQwMCIgeT0iMCIgb3BhY2l0eT0iMC4xNSI+PC9yZWN0PjxjaXJjbGUgcj0iMTAuODU1MjYzMTU3ODk0NzM2IiBjeD0iNDAwIiBjeT0iMCIgZmlsbD0iaHNsYSgwLCAwJSwgMTAwJSwgMS4wMCkiIHN0cm9rZT0ibm9uZSI+PC9jaXJjbGU+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHg9IjgwMCIgeT0iMCIgb3BhY2l0eT0iMC4xNSI+PC9yZWN0PjxjaXJjbGUgcj0iMTAuODU1MjYzMTU3ODk0NzM2IiBjeD0iODAwIiBjeT0iMCIgZmlsbD0iaHNsYSgwLCAwJSwgMTAwJSwgMS4wMCkiIHN0cm9rZT0ibm9uZSI+PC9jaXJjbGU+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHg9IjAiIHk9IjQwMCIgb3BhY2l0eT0iMC4xNSI+PC9yZWN0PjxjaXJjbGUgcj0iMTAuODU1MjYzMTU3ODk0NzM2IiBjeD0iMCIgY3k9IjQwMCIgZmlsbD0iaHNsYSgwLCAwJSwgMTAwJSwgMS4wMCkiIHN0cm9rZT0ibm9uZSI+PC9jaXJjbGU+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHg9IjQwMCIgeT0iNDAwIiBvcGFjaXR5PSIwLjE1Ij48L3JlY3Q+PGNpcmNsZSByPSIxMC44NTUyNjMxNTc4OTQ3MzYiIGN4PSI0MDAiIGN5PSI0MDAiIGZpbGw9ImhzbGEoMCwgMCUsIDEwMCUsIDEuMDApIiBzdHJva2U9Im5vbmUiPjwvY2lyY2xlPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB4PSI4MDAiIHk9IjQwMCIgb3BhY2l0eT0iMC4xNSI+PC9yZWN0PjxjaXJjbGUgcj0iMTAuODU1MjYzMTU3ODk0NzM2IiBjeD0iODAwIiBjeT0iNDAwIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSIgc3Ryb2tlPSJub25lIj48L2NpcmNsZT48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeD0iMCIgeT0iODAwIiBvcGFjaXR5PSIwLjE1Ij48L3JlY3Q+PGNpcmNsZSByPSIxMC44NTUyNjMxNTc4OTQ3MzYiIGN4PSIwIiBjeT0iODAwIiBmaWxsPSJoc2xhKDAsIDAlLCAxMDAlLCAxLjAwKSIgc3Ryb2tlPSJub25lIj48L2NpcmNsZT48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeD0iNDAwIiB5PSI4MDAiIG9wYWNpdHk9IjAuMTUiPjwvcmVjdD48Y2lyY2xlIHI9IjEwLjg1NTI2MzE1Nzg5NDczNiIgY3g9IjQwMCIgY3k9IjgwMCIgZmlsbD0iaHNsYSgwLCAwJSwgMTAwJSwgMS4wMCkiIHN0cm9rZT0ibm9uZSI+PC9jaXJjbGU+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIHg9IjgwMCIgeT0iODAwIiBvcGFjaXR5PSIwLjE1Ij48L3JlY3Q+PGNpcmNsZSByPSIxMC44NTUyNjM1NTc4OTQ3MzYiIGN4PSI4MDAiIGN5PSI4MDAiIGZpbGw9ImhzbGEoMCwgMCUsIDEwMCUsIDEuMDApIiBzdHJva2U9Im5vbmUiPjwvY2lyY2xlPjwvZz48L3N2Zz4=')",
								backgroundSize: "25px 25px",
								display: "flex",
								flexDirection: "column",
								gap: "14px",
								height: "100%",
								justifyContent: "flex-start",
								paddingLeft: "170px",
								position: "relative",
								textAlign: "left",
								width: "100%",
								zIndex: 999,
							}}
							tw="absolute bg-repeat w-full h-full"
						/>
						<div
							style={{
								background: "linear-gradient(45deg, #000000 4%, #fff, #000)",
								backgroundClip: "text",
								color: "transparent",
								paddingLeft: "170px",
								paddingTop: "200px",
							}}
							tw="flex text-6xl absolute bottom-56 isolate font-bold"
						>
							{trueHeading}
						</div>

						<div
							style={{
								background:
									"linear-gradient(10deg, #d4d4d8, 04%, #fff, #d4d4d8)",
								backgroundClip: "text",
								color: "transparent",
								opacity: 0.7,
								paddingLeft: "170px",
							}}
							tw="flex absolute bottom-44 z-[999] text-2xl"
						>
							{description}
						</div>

						<div
							style={{
								background:
									"linear-gradient(10deg, #d4d4d8, 04%, #fff, #d4d4d8)",
								backgroundClip: "text",
								color: "transparent",
								opacity: 0.8,
								paddingLeft: "170px",
							}}
							tw="flex text-2xl absolute bottom-28 z-[999]"
						>
							{date}
						</div>
					</div>

					{/* Lines */}
					<div
						style={{
							background: "linear-gradient(90deg, #888888 30%, #1d1f1f 70%)",
						}}
						tw="absolute top-10% w-full h-px"
					/>
					<div
						style={{
							background: "#2c2c2c",
						}}
						tw="absolute bottom-10% w-full h-px"
					/>
					<div
						style={{
							background: "linear-gradient(180deg, #747474 30%, #222424 70%)",
						}}
						tw="absolute left-10% h-full w-px"
					/>
					<div
						style={{
							background: "#2c2c2c",
						}}
						tw="absolute right-10% h-full w-px"
					/>
				</div>
			</div>,
			{
				fonts: [
					{
						data: geist,
						name: "Geist",
						style: "normal",
						weight: 400,
					},
				],
				height: 630,
				width: 1200,
			},
		);
	} catch (err) {
		console.log({ err });
		return new Response("Failed to generate the OG image", { status: 500 });
	}
}
