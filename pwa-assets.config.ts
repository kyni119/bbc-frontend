import {
	createAppleSplashScreens,
	defineConfig,
	minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
	headLinkOptions: {
		preset: '2023',
	},
	preset: {
		...minimal2023Preset,
		transparent: {
			...minimal2023Preset.transparent,
		},
		maskable: {
			...minimal2023Preset.maskable,
			resizeOptions: {
				fit: 'contain',
				background: '#04191f',
			},
		},
		apple: {
			...minimal2023Preset.apple,
			resizeOptions: {
				fit: 'contain',
				background: '#04191f',
			},
		},
		appleSplashScreens: createAppleSplashScreens(
			{
				...minimal2023Preset.appleSplashScreens,
				padding: 0.3,
				resizeOptions: { fit: 'contain', background: '#c1e7e4' },
				darkResizeOptions: { fit: 'contain', background: '#04191f' },
				linkMediaOptions: {
					log: true,
					addMediaScreen: true,
					xhtml: true,
				},
			},
			['iPad Air 9.7"']
		),
	},
	images: 'public/favicon.svg',
});
