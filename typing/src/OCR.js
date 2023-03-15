export function tesseractOCR(worker, canvas) {
	// https://github.com/naptha/tesseract.js/blob/master/docs/examples.md#with-multiple-workers-to-speed-up
	return worker.recognize(canvas);
}
