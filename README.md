# tankman-server
Water Tank Monitoring Backend

## Important System Requirements

This module will only interface with hardware on Linux, but should compile on
any other platform, where it will run in mock mode by default.

### Disable GPIO interrupts

If running a newer Raspbian release, you will need to add the following line to
`/boot/config.txt` and reboot:

```
dtoverlay=gpio-no-irq
```

Without this you may see crashes with newer kernels when trying to poll for pin
changes.

### Enable /dev/gpiomem access

By default the module will use `/dev/gpiomem` when using simple GPIO access.
To access this device, your user will need to be a member of the `gpio` group,
and you may need to configure udev with the following rule (as root):

```console
$ cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```

For access to i²c, PWM, and SPI, or if you are running an older kernel which
does not have the `bcm2835-gpiomem` module, you will need to run your programs
as root for access to `/dev/mem`.