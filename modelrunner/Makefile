SUBDIRS := $(wildcard */.)

build: $(SUBDIRS)
$(SUBDIRS):
	$(MAKE) -C $@

.PHONY: build $(SUBDIRS)
