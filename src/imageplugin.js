import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class InsertImage extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: 'Insert image',
				icon: imageIcon,
				tooltip: true
			} );

			// Callback executed once the image is clicked.
			view.on( 'execute', () => {
				// TODO:
				// call function which returns a promise with the image url
				// insert an image with the given url
				console.log(this, this.imageRetriever);
				if ( !this.imageRetriever ) {
					return;
				}

				this.imageRetriever()
					.then( imageUrl => {
						this.insertImage( editor, imageUrl );
					} );
			} );

			return view;
		} );
	}

	insertImage( editor, imageUrl ) {
		editor.model.change( writer => {
			const imageElement = writer.createElement( 'image', {
				src: imageUrl
			} );
			editor.model.insertContent( imageElement, editor.model.document.selection );
		} );
	}

	static get pluginName() {
		return 'InsertImage';
	}
}
