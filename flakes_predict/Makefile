ifndef IMAGETAG
override IMAGETAG = quay.io/opendatahub/ai-library-flakes-predict
endif

build:
	cp ../storage/s3.py .
	cp ../accuracy_measures/measures.py .
	mkdir -p .s2i/bin
	cp ../s2i/bin/run ./.s2i/bin/
	s2i build . registry.access.redhat.com/ubi8/python-36 ${IMAGETAG}
	rm s3.py measures.py
	rm -rf ./.s2i/bin
.PHONY: build
