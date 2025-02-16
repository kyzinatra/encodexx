import { Serializer } from "./libs/serializer/old";
import { t } from "./libs/type/common";
import { float64 } from "./libs/type/common/float64";
import { ExtractObj } from "./types/types";

export { Serializer } from "./libs/serializer";
export { t } from "./libs/type/common";
export { ArraySingle } from "./types/types";

const lognStr = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia justo lorem. Nullam semper ligula a tortor tincidunt, ac rhoncus lorem tempus. Suspendisse facilisis eget augue vel sodales. Ut ac mattis arcu. Vestibulum aliquam nibh in neque maximus mattis. Curabitur efficitur ex eu velit facilisis commodo. Pellentesque congue, eros ac tincidunt tempor, dolor lorem consectetur orci, et posuere ante enim at turpis. Aliquam erat volutpat. In porttitor tortor a nibh sagittis dictum. Nunc nisi sem, tristique non dolor interdum, sagittis tincidunt elit. Sed dui felis, scelerisque eget tellus non, porttitor ornare diam. Fusce viverra mauris eget ligula pretium, at sodales orci feugiat.

Nullam eleifend non arcu sed dapibus. Vivamus vehicula diam vitae risus maximus, et posuere nunc scelerisque. Curabitur sed nulla ut massa egestas venenatis. Nullam mi neque, congue at magna ut, euismod volutpat eros. Phasellus rhoncus dictum vestibulum. Fusce ante mauris, accumsan sit amet arcu in, laoreet convallis massa. Etiam eu aliquet nunc, in ultrices enim. Donec rhoncus dapibus ligula vitae lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras iaculis libero nec arcu volutpat rhoncus. Nunc tellus nulla, tempus ut est imperdiet, finibus malesuada neque. Phasellus sed nibh nisl.

Mauris nec luctus tortor, in efficitur sem. Quisque molestie lobortis congue. Sed euismod mi eget porta semper. Integer quis dictum quam. Pellentesque mauris erat, vestibulum at dictum in, eleifend non libero. Ut tempor diam orci, maximus dapibus diam consequat a. Proin tincidunt felis et vehicula elementum. Nulla tempus velit eu tortor faucibus, eget laoreet ligula gravida. Vestibulum mattis congue tellus. Nulla facilisi. In eu nunc iaculis, aliquam metus nec, dictum nisl.

Morbi dapibus nisl leo. Pellentesque condimentum a leo tempor gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer interdum metus risus, ut sagittis sem pulvinar nec. Aliquam erat volutpat. Sed lorem nibh, aliquet vel convallis sodales, viverra sed nibh. Ut tempus sapien at arcu sagittis, vel vehicula nisi porttitor. In quis mi a tortor pellentesque vulputate. Nulla convallis posuere consequat. Nam at tincidunt tortor.

Nunc et sodales erat, eget sagittis nibh. Duis sed mi sem. In mattis ligula sit amet nibh dictum hendrerit in eget augue. Ut dictum pellentesque lacus, ut fringilla purus. Suspendisse laoreet risus eget elementum egestas. Integer arcu massa, sagittis eget sodales non, consectetur nec metus. Duis luctus purus tincidunt, ultricies elit id, lacinia nulla. Etiam aliquam volutpat varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer rutrum, nunc nec iaculis tempus, purus velit tempus augue, vitae aliquam nisl nibh a turpis. Ut ultricies posuere eleifend. Quisque pellentesque fringilla accumsan. Quisque consequat malesuada enim. Duis tortor lorem, maximus sed pretium non, aliquet id elit.

Nullam sed commodo odio, sed dapibus odio. Aliquam ut commodo metus. Cras vestibulum augue condimentum suscipit mollis. Etiam eleifend lectus aliquam cursus efficitur. Donec tempor venenatis tincidunt. Fusce semper tortor sapien, quis tincidunt purus lacinia et. Aenean a sapien id libero consectetur mollis sit amet eleifend metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam nec metus maximus mi convallis posuere. Integer ultrices pellentesque nulla. Aenean rhoncus molestie augue, a convallis ipsum pharetra ac. Aenean blandit ex eleifend, maximus orci eget, euismod tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur ut mi ac sapien gravida tristique. Nunc at mauris et nisi faucibus dignissim et vel dui.

Nam nunc enim, ultricies eu semper vitae, dictum a nisi. Sed sit amet augue congue, malesuada ex et, commodo magna. Phasellus pharetra bibendum eros et volutpat. Nulla ut augue quam. Duis ligula mauris, dapibus vel mauris nec, scelerisque lobortis nulla. Donec quis ante vel nisl efficitur imperdiet. Proin aliquet risus velit, id semper nunc blandit quis.

Mauris metus quam, venenatis at neque vel, semper vehicula purus. Mauris orci lectus, convallis vel tempor sit amet, bibendum sed velit. Curabitur condimentum ullamcorper ligula id tempus. Vestibulum aliquet dolor ante. Duis quis ipsum lorem. Nullam tincidunt, mauris placerat laoreet ornare, leo nunc euismod tellus, eu lacinia dui nunc nec leo. Nunc vel nisi sed odio varius dapibus a a neque. Sed lacinia est velit, sit amet ornare ex pharetra non. Integer risus neque, porttitor a dolor a, pretium aliquet purus. Curabitur tincidunt vehicula dui, quis consequat justo. Mauris convallis ultricies velit faucibus egestas. Donec ex erat, tincidunt sit amet fringilla eget, lacinia sit amet mauris. Duis at nunc a velit tempor tempor sed quis dui. Nam non mi a urna maximus dictum eu a augue. Cras maximus pretium lacus, non eleifend felis. Nam fermentum feugiat neque.

Cras mi nibh, aliquet fringilla nunc in, hendrerit vehicula purus. Duis sed justo lobortis, pellentesque lacus sed, efficitur massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi a pellentesque dui. Vivamus eleifend, quam non pretium consectetur, magna nisl vehicula felis, vitae faucibus sapien nibh a justo. Pellentesque egestas, erat sit amet pellentesque euismod, nisi ligula molestie ex, id ultricies ante velit at felis. Etiam laoreet rhoncus aliquet. Nulla augue sapien, consequat et consequat sed, feugiat id mauris. Cras dictum magna vel leo tempor posuere.

Fusce a fermentum quam, et aliquet urna. Quisque eget purus tortor. Nulla nec posuere ex. Sed luctus gravida arcu et vehicula. Maecenas sed tortor euismod, suscipit elit volutpat, mattis nisl. Vivamus sed justo pretium orci tristique gravida. Sed pharetra ex quis est consequat mattis. Mauris at arcu facilisis, mollis massa in, venenatis turpis.

Nam auctor felis sed eros rutrum, id euismod nisi molestie. Nullam posuere condimentum congue. Pellentesque nec purus nec risus imperdiet blandit. In vel tristique augue. Curabitur in egestas leo. Sed id dui quis felis sagittis porta vitae eget nulla. Proin a sapien sollicitudin, pellentesque lorem vel, faucibus turpis. Praesent vitae mauris tincidunt, sollicitudin nisi vel, vestibulum metus. Nam euismod tincidunt accumsan. Cras dignissim ultricies lectus quis fermentum. Quisque odio dolor, ultrices eget eleifend vel, vestibulum in diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Duis tincidunt aliquam massa, ut condimentum elit molestie vel. Morbi egestas est et rutrum euismod. Integer iaculis sapien eget justo interdum tristique. Proin ac mauris a elit faucibus sollicitudin non quis nisi. Mauris id arcu sed sapien imperdiet posuere. Donec urna purus, vehicula id orci nec, commodo maximus quam. Proin nec commodo ligula, porta feugiat velit. Donec justo enim, rhoncus dictum interdum porta, fermentum at purus. Fusce mattis gravida ipsum. In vitae ultrices justo, vitae aliquet nisl. Nulla mollis elit ut malesuada dapibus. Curabitur fermentum mauris nec justo congue, quis dapibus eros sagittis. Nunc aliquet metus sit amet consectetur efficitur. Mauris a tristique quam. Duis scelerisque tristique urna eget scelerisque.

Quisque finibus tristique felis, a eleifend nibh. Praesent fringilla ut odio eget dignissim. In imperdiet porttitor quam sed efficitur. Nulla at luctus lacus. Vivamus ac nisi at lorem posuere vehicula sed quis nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus at tempus lectus. Aliquam pellentesque ipsum aliquet, porta felis at, scelerisque felis. Sed non vulputate urna. Suspendisse potenti. Vestibulum tempus arcu leo, ac condimentum mauris feugiat et. Nulla auctor odio vitae lorem commodo convallis.

Quisque varius est fringilla rutrum iaculis. Donec maximus, turpis eget aliquet semper, eros sem placerat augue, ultrices convallis tortor massa vel nibh. Pellentesque lacinia ante at eros eleifend rutrum. Aenean vestibulum fermentum porttitor. Suspendisse quis ultrices mi. Nam feugiat vulputate quam. Maecenas in lacinia sapien, in faucibus mi. Nullam quis rutrum ante. Proin nec egestas tortor, eget vulputate arcu. Etiam vitae aliquet enim, id pharetra purus. In imperdiet mi sit amet ligula vestibulum molestie.

Curabitur mattis, nibh non eleifend laoreet, diam ligula suscipit dui, nec mattis ipsum turpis vitae ipsum. Nunc ac nisi turpis. Duis eu massa ac mi sagittis sodales. Praesent convallis vehicula elit. Quisque neque enim, imperdiet dapibus gravida eu, lobortis eget felis. Duis in libero tempus, posuere enim eu, sagittis augue. Cras porta dapibus magna sit amet efficitur. Donec elit massa, ornare nec faucibus ac, volutpat nec ipsum.

Integer ac augue quis est interdum sagittis sit amet quis arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id facilisis odio, egestas pharetra magna. Curabitur euismod, augue id lacinia aliquam, augue urna hendrerit orci, non convallis leo lectus ut odio. Etiam imperdiet vel lectus at tristique. In vitae elementum eros, nec suscipit tellus. Vestibulum sit amet est metus. Suspendisse volutpat eleifend neque quis fermentum. Mauris augue lorem, egestas sit amet luctus ac, faucibus nec ante. Integer ex magna, consequat eget sollicitudin quis, lobortis in nisi.

Praesent nec convallis metus. Vivamus velit mauris, pulvinar non ante quis, suscipit molestie nunc. Mauris nec luctus tortor. Fusce et mauris id lacus suscipit ultrices. Ut eu ligula sapien. Cras vehicula pretium erat, aliquet porttitor leo fringilla in. Nullam dictum lacus eros, sed tempus dolor egestas nec. Curabitur scelerisque aliquam quam sit amet elementum. Donec efficitur finibus mauris at faucibus. Fusce molestie dapibus metus, et pretium enim mollis sed. Vivamus fringilla tristique quam in auctor.

Quisque eu molestie est, sit amet mollis neque. Maecenas volutpat elit et erat pulvinar, vel volutpat sapien consectetur. Vestibulum ornare mattis aliquam. Quisque eu justo nisi. Donec viverra dui lacus, ut placerat eros bibendum in. Donec at ex nec eros semper volutpat. Integer dignissim odio vel nisl ullamcorper, sed auctor velit egestas.

Integer mattis nec dui at posuere. Sed nisi enim, consequat non risus sit amet, iaculis interdum turpis. Quisque orci felis, volutpat ut nisl ac, commodo scelerisque dolor. Quisque condimentum lacus erat, eget maximus magna laoreet eu. Duis non tempus risus, a imperdiet massa. Phasellus vitae quam erat. Pellentesque eget tincidunt libero. Fusce at tellus scelerisque libero efficitur hendrerit.

Praesent commodo efficitur pretium. Mauris ultrices, nisi eget sodales faucibus, dolor leo facilisis odio, nec placerat augue orci pharetra odio. Morbi sagittis ipsum at eleifend ultrices. Donec porta ipsum a nibh fringilla tempor. Ut vitae justo vel odio scelerisque bibendum. Aenean dignissim justo a venenatis fermentum. Nullam vel ante iaculis, posuere sapien at, lobortis velit. Fusce quam ipsum, interdum sed tincidunt quis, fermentum et nulla.`;

console.time("compile");
const serializer = new Serializer({
	plot: [
		[
			{
				x: float64,
				y: float64,
				z: float64,
			},
		],
	],
	description: [[t.or(t.str, t.uint8)]],
	unit: {
		a: {
			b: {
				c: {
					d: {
						e: {
							f: {
								g: {
									h: {
										i: {
											j: {
												k: {
													plot: [
														[
															[
																[
																	[
																		[
																			[
																				[
																					{
																						x: float64,
																						y: float64,
																						z: float64,
																					},
																				],
																			],
																		],
																	],
																],
															],
														],
													],
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},

	best: t.or(t.undef, t.none, t.str),
	long: t.uleb128,
});
console.timeEnd("compile");

const original = {
	plot: [
		Array.from({ length: 100 }, () => ({
			x: Math.random() * 10000,
			y: Math.random() * 10000,
			z: Math.random() * 10000,
		})),
	],
	description: [Array.from({ length: 10 }, () => lognStr)],
	unit: {
		a: {
			b: {
				c: {
					d: {
						e: {
							f: {
								g: {
									h: {
										i: {
											j: {
												k: {
													plot: [
														[
															[
																[
																	Array.from({ length: 100 }, () =>
																		Array.from({ length: 100 }, () =>
																			Array.from({ length: 100 }, () =>
																				Array.from({ length: 10 }, () => ({
																					x: Math.random() * 10000,
																					y: Math.random() * 10000,
																					z: Math.random() * 10000,
																				}))
																			)
																		)
																	),
																],
															],
														],
													],
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},

	best: lognStr,
	long: 1n << 1000n,
};

let result = [];
for (let i = 0; i < 20; i++) {
	const now = performance.now();
	serializer.encode(original);
	result.push(performance.now() - now);
}

console.log(result.reduce((a, b) => a + b, 0) / result.length);
