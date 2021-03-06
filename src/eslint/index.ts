import Generator from 'yeoman-generator';
import extendPkg from './extend-pkg.json';

class Eslint extends Generator {
	// yo xxproject:eslint --typescript --prettier
	constructor(args: string | string[], options: {}) {
		super(args, options);

		this.option('typescript', {
			default: false,
			description: 'combine with typescript?',
			type: Boolean
		});

		this.option('prettier', {
			default: false,
			description: 'combine with prettier?',
			type: Boolean
		});
	}

	initializing() {
		if (this.options.typescript) {
			this.composeWith(require.resolve('../typescript'), {});
			this.composeWith(require.resolve('../eslint-typescript'), {});
		}
		if (this.options.prettier) {
			this.composeWith(require.resolve('../prettier'), {});
			this.composeWith(require.resolve('../eslint-prettier'), {});
		}
	}

	writing() {
		const pkgJson = extendPkg;

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
	}

	install() {
		this.npmInstall();
	}

	end() {
		this.fs.copy(
			this.templatePath('.eslintrc.js'),
			this.destinationPath('.eslintrc.js')
		);

		this.fs.copy(
			this.templatePath('.eslintignore'),
			this.destinationPath('.eslintignore')
		);
	}
}

module.exports = Eslint;
