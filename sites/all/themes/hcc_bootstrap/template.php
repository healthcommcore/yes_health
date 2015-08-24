<?php

/**
 * @file
 * template.php
 */

/**
 * Implementation of hook_theme()
 */
function hcc_bootstrap_theme() {
  $items['user_login'] = array(
    'render element' => 'form',
    'path' => drupal_get_path('theme', 'hcc_bootstrap') . '/templates',
    'template' => 'user_login',
  );
  return $items;
}

/**
 * Implements hook_preprocess_user_login().
 */
function hcc_bootstrap_preprocess_user_login(&$vars) {
  //print_r($vars['form']);
  $vars['form']['name']['#title'] = 'User name';
  $vars['form']['remember_me']['#title'] = 'Save this information so I stay signed in';
}

/**
 * Implements hook_preprocess_page().
 */
function hcc_bootstrap_preprocess_page(&$variables) {
  //print_r($variables);
  if (!empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-md-9 col-sm-12"';
  }
	if ( isset($variables['navbar_classes_array']) ) {
		if ($index = array_search('container', $variables['navbar_classes_array']) ) {
			array_splice( $variables['navbar_classes_array'], $index, 1);
		}
	}
  if ($_GET['q'] == 'user') {
    $variables['title'] = t('Sign in');
  }
}

/**
 * Implements hook_menu_link
 */
function hcc_bootstrap_assessment_menu_link(array $variables) {
  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {
    // Prevent dropdown functions from being added to management menu so it
    // does not affect the navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }
    elseif ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] == 1)) {
      // Add our own wrapper.
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      // Generate as standard dropdown.
      //$element['#title'] .= ' <span class="caret"></span>';
      $element['#attributes']['class'][] = 'dropdown';
      $element['#localized_options']['html'] = TRUE;

      // Set dropdown trigger element to # to prevent inadvertant page loading
      // when a submenu link is clicked.
			/*
      $element['#localized_options']['attributes']['data-target'] = '#';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';
			 */
    }
  }
  // On primary navigation menu, class 'active' is not set on active menu item.
  // @see https://drupal.org/node/1896674
  if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']))) {
    $element['#attributes']['class'][] = 'active';
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
}
