define(['parse'], function(Parse) {

	describe('Media query parser', function() {
		it('simple parse', function() {
			expect(Parse.parse("(min-height: 44px)")).toBeDefined();
		});

		it('simple eval min-height 1', function() {
			expect(Parse.eval(Parse.parse("(min-height: 44px)"), {
				height: 400,
				width: 400
			})).toBeTruthy();
		});
		it('simple eval min-height 2', function() {
			expect(Parse.eval(Parse.parse("(min-height: 44px)"), {
				height: 39,
				width: 39
			})).toBeFalsy();
		});

		it('complex eval min-height & max-height', function() {
			expect(Parse.eval(Parse.parse("(min-height: 44px) and (max-height: 52px)"), {
				height: 49,
				width: 39
			})).toBeTruthy();
		});

		it('complex eval min-height & max-height', function() {
			expect(Parse.eval(Parse.parse("(min-height: 44px) and (max-height: 52px)"), {
				height: 53,
				width: 39
			})).toBeFalsy();
		});
		
		it('screen and (min-width: 768px)', function() {
			expect(Parse.eval(Parse.parse("screen and (min-width: 768px)"), {
				mediaType: "screen",
				height: 53,
				width: 770
			})).toBeTruthy();
		});
		it('media type 1', function() {
			expect(Parse.eval(Parse.parse("tv"), {
				mediaType: "tv",
				height: 53,
				width: 39
			})).toBeTruthy();
		});

		it('media type 2', function() {
			expect(Parse.eval(Parse.parse("tv"), {
				mediaType: "screen",
				height: 53,
				width: 39
			})).toBeFalsy();
		});

		it('media type 3', function() {
			expect(Parse.eval(Parse.parse("all"), {
				mediaType: "tv",
				height: 53,
				width: 39
			})).toBeTruthy();
		});

		it('media type 4', function() {
			expect(Parse.eval(Parse.parse("not screen"), {
				mediaType: "tv",
				height: 53,
				width: 39
			})).toBeTruthy();
		});

		it('media type 5', function() {
			expect(Parse.eval(Parse.parse("print"), {
				mediaType: "print",
				height: 53,
				width: 39
			})).toBeTruthy();
		});
		
		it('(min-resolution: 300dpcm)', function() {
			expect(Parse.eval(Parse.parse("(min-resolution: 300dpcm)"), {
				resolution: 900
			})).toBeTruthy();
		});

		it('(max-resolution: 300dpcm)', function() {
			expect(Parse.eval(Parse.parse("(max-resolution: 300dpcm)"), {
				resolution: 50
			})).toBeTruthy();
		});
		it('(min-width: 700px) and (orientation: landscape) ', function() {
			expect(Parse.eval(Parse.parse("(min-width: 700px) and (orientation: landscape)"), {
				orientation: "landscape",
				resolution: 50,
				width: 900
			})).toBeTruthy();
		});
	});
});
