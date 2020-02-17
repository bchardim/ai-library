ifndef IMAGETAG
override IMAGETAG = quay.io/opendatahub/ai-library-correlation-analysis
endif

build:
	mkdir -p .s2i/bin
	cp ../s2i/bin/run ./.s2i/bin/
	s2i build . registry.access.redhat.com/ubi8/python-36 ${IMAGETAG}
	rm -rf ./.s2i/bin
.PHONY: build
