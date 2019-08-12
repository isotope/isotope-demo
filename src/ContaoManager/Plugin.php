<?php

namespace Isotope\Demo\ContaoManager;

use Contao\ManagerPlugin\Config\ContainerBuilder;
use Contao\ManagerPlugin\Config\ExtensionPluginInterface;

class Plugin implements ExtensionPluginInterface
{

    /**
     * Allows a plugin to override extension configuration.
     *
     * @param string $extensionName
     *
     * @return array<string,mixed>
     */
    public function getExtensionConfig($extensionName, array $extensionConfigs, ContainerBuilder $container)
    {
        if ('contao' === $extensionName) {
            $hasPrepend = array_reduce($extensionConfigs, function($c, $config) {
                return (isset($config['prepend_locale']) && '%prepend_locale%' !== $config['prepend_locale']) || $c;
            }, false);

            if (!$hasPrepend) {
                $extensionConfigs[] = ['prepend_locale' => true];
            }
        }

        return $extensionConfigs;
    }
}
