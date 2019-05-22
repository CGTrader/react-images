import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScrollLock from 'react-scrolllock';

import defaultTheme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import DefaultSpinner from './components/Spinner';
import Video from './components/Video';
import Marmoset from './components/Marmoset';
import ToggleFullscreen from './components/ToggleFullscreen';
import WebRotatable from './components/WebRotatable';

import bindFunctions from './utils/bindFunctions';
import canUseDom from './utils/canUseDom';
import deepMerge from './utils/deepMerge';

import styles from './Lightbox.css';

// consumers sometimes provide incorrect type or casing
function normalizeSourceSet (data) {
	const sourceSet = data.srcSet || data.srcset;

	if (Array.isArray(sourceSet)) {
		return sourceSet.join();
	}

	return sourceSet;
}

class Lightbox extends Component {
	constructor (props) {
		super(props);

		this.theme = deepMerge(defaultTheme, props.theme);
		this.state = { imageLoaded: false };

		bindFunctions.call(this, [
			'gotoNext',
			'gotoPrev',
			'closeBackdrop',
			'handleKeyboardInput',
			'handleImageLoaded',
			'handleToggleFullscreenClick',
		]);
	}
	getChildContext () {
		return {
			theme: this.theme,
		};
	}
	componentDidMount () {
		if (this.props.isOpen) {
			if (this.props.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (typeof this.props.currentImage === 'number') {
				this.preloadImage(this.props.currentImage, this.handleImageLoaded);
			}
		}
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

		// preload images
		if (nextProps.preloadNextImage) {
			const currentIndex = this.props.currentImage;
			const nextIndex = nextProps.currentImage + 1;
			const prevIndex = nextProps.currentImage - 1;
			let preloadIndex;

			if (currentIndex && nextProps.currentImage > currentIndex) {
				preloadIndex = nextIndex;
			} else if (currentIndex && nextProps.currentImage < currentIndex) {
				preloadIndex = prevIndex;
			}

			// if we know the user's direction just get one image
			// otherwise, to be safe, we need to grab one in each direction
			if (preloadIndex) {
				this.preloadImage(preloadIndex);
			} else {
				this.preloadImage(prevIndex);
				this.preloadImage(nextIndex);
			}
		}

		// preload current image
		if (this.props.currentImage !== nextProps.currentImage || !this.props.isOpen && nextProps.isOpen) {
			const img = this.preloadImageData(nextProps.images[nextProps.currentImage], this.handleImageLoaded);
			if (img) this.setState({ imageLoaded: img.complete });
		}

		// add/remove event listeners
		if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
		if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillUnmount () {
		if (this.props.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}

	// ==============================
	// METHODS
	// ==============================

	preloadImage (idx, onload) {
		return this.preloadImageData(this.props.images[idx], onload);
	}
	preloadImageData (data, onload) {
		if (!data || !data.src || data.type === 'marmoset') return;
		const img = new Image();
		const sourceSet = normalizeSourceSet(data);

		// TODO: add error handling for missing images
		img.onerror = onload;
		img.onload = onload;
		img.src = data.src;

		if (sourceSet) img.srcset = sourceSet;

		return img;
	}
	gotoNext (event) {
		const { currentImage, images } = this.props;
		const { imageLoaded } = this.state;

		if (!imageLoaded || currentImage === (images.length - 1)) return;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickNext();
	}
	gotoPrev (event) {
		const { currentImage } = this.props;
		const { imageLoaded } = this.state;

		if (!imageLoaded || currentImage === 0) return;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickPrev();
	}
	closeBackdrop (event) {
		// make sure event only happens if they click the backdrop
		// and if the caption is widening the figure element let that respond too
		if (event.target.id === 'lightboxBackdrop' || event.target.tagName === 'FIGURE') {
			this.props.onClose();
		}
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) { // left
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) { // right
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) { // esc
			this.props.onClose();
			return true;
		}
		return false;

	}
	handleImageLoaded () {
		this.setState({ imageLoaded: true });
	}
	handleToggleFullscreenClick () {
		this.props.onToggleFullscreenClick();
	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;

		return (
			<Arrow
				direction="left"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				title={this.props.leftArrowTitle}
				type="button"
			/>
		);
	}
	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;

		return (
			<Arrow
				direction="right"
				icon="arrowRight"
				onClick={this.gotoNext}
				title={this.props.rightArrowTitle}
				type="button"
			/>
		);
	}
	renderInline () {
		return (
			<div
				className={`react-images react-images__inline ${styles.inline}`}
			>
				{this.renderImages()}
				{this.renderFooter()}
				{this.renderThumbnails()}
				{this.props.showToggleFullscreen && <ToggleFullscreen onClick={this.handleToggleFullscreenClick} />}
			</div>
		);
	}
	renderDialog () {
		const {
			backdropClosesModal,
			isOpen,
			showThumbnails,
			width,
		} = this.props;

		const { imageLoaded } = this.state;

		if (!isOpen) return <span key="closed" />;

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
		}

		return (
			<Container
				key="open"
				onClick={backdropClosesModal ? this.closeBackdrop : undefined}
				onTouchEnd={backdropClosesModal ? this.closeBackdrop : undefined}
			>
				<div
					className={styles.modalContainer}
				>
					<div
						style={{ marginBottom: offsetThumbnails, maxWidth: width }}
						className={styles.content}
					>
						{this.renderHeader()}
						{this.renderImages()}
						{this.renderSpinner()}
						{imageLoaded && this.renderFooter()}
					</div>
					{this.renderThumbnails()}
					{this.renderArrowPrev()}
					{this.renderArrowNext()}
					{this.props.preventScroll && <ScrollLock />}
				</div>
			</Container>
		);
	}
	renderImage (image) {
		const {
			onClickImage,
		} = this.props;

		const { imageLoaded } = this.state;

		const sourceSet = normalizeSourceSet(image);
		const sizes = sourceSet ? '100vw' : null;

		return (
			<img
				className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
				style={{
					cursor: onClickImage ? 'pointer' : 'auto',
				}}
				onClick={onClickImage}
				sizes={sizes}
				alt={image.alt}
				src={image.src}
				srcSet={sourceSet}
			/>
		);
	}
	renderVideo (item) {
		return (
			<Video
				{...item}
				inline={this.props.inline}
			/>
		);
	}
	renderMarmoset (item) {
		return (
			<Marmoset
				{...item}
				inline={this.props.inline}
			/>
		);
	}
	renderRotator (item) {
		return (
			<WebRotatable
				{...item}
				inline={this.props.inline}
			/>
		);
	}
	renderImages () {
		const {
			currentImage,
			images,
			inline,
			customContent,
		} = this.props;

		const { imageLoaded } = this.state;

		if (!images || !images.length) return null;

		const item = images[currentImage];

		let content;
		const customComponentContent = customContent && item.custom && customContent(item);
		switch (true) {
			case !!customComponentContent:
				content = customComponentContent;
				break;
			case item.type === 'youtube':
			case item.type === 'vimeo':
				content = this.renderVideo(item);
				break;
			case item.type === 'marmoset':
				content = this.renderMarmoset(item);
				break;
			case item.type === 'rotator':
				content = this.renderRotator(item);
				break;
			default:
				content = this.renderImage(item);
		}

		return (
			<figure
				className={inline ? styles.inlineFigure : styles.figure}
			>
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
				{content}
				{inline && imageLoaded && this.renderArrowPrev()}
				{inline && imageLoaded && this.renderArrowNext()}
				{item.appendComponent && item.appendComponent(item)}
			</figure>
		);
	}
	renderThumbnails () {
		const {
			images,
			currentImage,
			onClickThumbnail,
			onClickNext,
			onClickPrev,
			showThumbnails,
			thumbnailOffset,
			inline,
			customThumbnailContent,
		} = this.props;

		if (!showThumbnails) return;

		return (
			<PaginatedThumbnails
				currentImage={currentImage}
				images={images}
				offset={thumbnailOffset}
				onClickThumbnail={onClickThumbnail}
				onClickNext={onClickNext}
				onClickPrev={onClickPrev}
				inline={inline}
				customThumbnailContent={customThumbnailContent}
			/>
		);
	}
	renderHeader () {
		const {
			closeButtonTitle,
			customControls,
			onClose,
			showCloseButton,
		} = this.props;

		return (
			<Header
				customControls={customControls}
				onClose={onClose}
				showCloseButton={showCloseButton}
				closeButtonTitle={closeButtonTitle}
			/>
		);
	}
	renderFooter () {
		const {
			currentImage,
			images,
			imageCountSeparator,
			showImageCount,
		} = this.props;

		if (!images || !images.length) return null;

		return (
			<Footer
				caption={images[currentImage].caption}
				countCurrent={currentImage + 1}
				countSeparator={imageCountSeparator}
				countTotal={images.length}
				showCount={showImageCount}
			/>
		);
	}
	renderSpinner () {
		const {
			spinner,
			spinnerColor,
			spinnerSize,
		} = this.props;

		const { imageLoaded } = this.state;
		const Spinner = spinner;

		return (
			<div
				className={`${styles.spinner} ${!imageLoaded ? styles.spinnerActive : ''}`}
			>
				<Spinner
					color={spinnerColor}
					size={spinnerSize}
				/>
			</div>
		);
	}
	render () {
		if (this.props.inline) {
			return this.renderInline();
		}
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	className: PropTypes.string,
	closeButtonTitle: PropTypes.string,
	currentImage: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcSet: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
			type: PropTypes.string,
		})
	).isRequired,
	inline: PropTypes.bool,
	isOpen: PropTypes.bool,
	leftArrowTitle: PropTypes.string,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	preventScroll: PropTypes.bool,
	rightArrowTitle: PropTypes.string,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	showToggleFullscreen: PropTypes.bool,
	spinner: PropTypes.func,
	spinnerColor: PropTypes.string,
	spinnerSize: PropTypes.number,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' / ',
	inline: false,
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	preventScroll: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	showToggleFullscreen: false,
	spinner: DefaultSpinner,
	spinnerColor: 'white',
	spinnerSize: 100,
	theme: {},
	thumbnailOffset: 2,
	width: 1024,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Lightbox;
