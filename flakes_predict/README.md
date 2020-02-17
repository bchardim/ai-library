# Flake Analysis

Flake analysis is used to identify false positive in test failures. The model uses DBSCAN clustering algorithm to cluster false positives and then predict the chances of a given failure being a false positive.

## Contents

`flakes_prediction.py` - Compute the probability a given test failure is false positive using the above trained model.
##### Parameters
* model - location of trained model.
* data -  failure log to run prediction on.

## Sample REST call

curl -v http://predictflakes-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=cchase/flake-old/models/testflakes.model, data=testBasic (check_journal.TestJournal)\n
\n
[0905/212816.673168:ERROR:gpu_process_transport_factory.cc(1017)] Lost UI shared context.\n
\n
DevTools listening on ws://127.0.0.1:9678/devtools/browser/faa4899a-aec5-4a63-8717-9c991913b26b\n
[0905/212816.716594:ERROR:zygote_host_impl_linux.cc(267)] Failed to adjust OOM score of renderer with pid 42364: Permission denied (13)\n
[0905/212816.874362:ERROR:zygote_host_impl_linux.cc(267)] Failed to adjust OOM score of renderer with pid 42409: Permission denied (13)\n
Warning: Stopping systemd-journald.service but it can still be activated by:\n
  systemd-journald-audit.socket\n
  systemd-journald.socket\n
  systemd-journald-dev-log.socket\n
 warning: transport closed: disconnected\n
ssh_exchange_identification: read: Connection reset by peer\n
CDP: {source:networklevel:errortext:Failed to load resource: net::ERR_EMPTY_RESPONSEtimestamp:1536182906007.98url:http://127.0.0.2:9591/cockpit/static/fonts/OpenSans-Light-webfont.woffnetworkRequestId:42409.28}\n
ssh_exchange_identification: read: Connection reset by peer\n
{call:[/org/freedesktop/timedate1org.freedesktop.DBus.PropertiesGet[org.freedesktop.timedate1NTPSynchronized]]id:4} \n
{call:[/org/freedesktop/timedate1org.freedesktop.DBus.PropertiesGet[org.freedesktop.timedate1NTPSynchronized]]id:5} \n
ssh_exchange_identification: read: Connection reset by peer\n
ssh_exchange_identification: read: Connection reset by peer\n
ssh_exchange_identification: read: Connection reset by peer\n
ssh_exchange_identification: read: Connection reset by peer\n
{call:[/org/freedesktop/timedate1org.freedesktop.DBus.PropertiesGet[org.freedesktop.timedate1NTPSynchronized]]id:6} \n
ok 42 testBasic (check_journal.TestJournal)  duration: 43s"}' -H "Content-Type: application/json"
