import {ViewportRuler} from '@angular/cdk/scrolling';
//import {ViewportRuler} from './view-port-ruler';
import {_getEventTarget} from '@angular/cdk/platform';
import {getMutableClientRect, adjustClientRect} from './client-rect';

/** Object holding the scroll position of something. */
interface ScrollPosition {
  top: number;
  left: number;
}

/** Keeps track of the scroll position and dimensions of the parents of an element. */
export class ParentPositionTracker {
  /** Cached positions of the scrollable parent elements. */
  readonly positions = new Map<
    Document | HTMLElement,
    {
      scrollPosition: ScrollPosition;
      clientRect?: ClientRect;
    }
  >();

  constructor(private _document: Document, private _viewportRuler: ViewportRuler) {}

  /** Clears the cached positions. */
  clear() {
    this.positions.clear();
  }

  /** Caches the positions. Should be called at the beginning of a drag sequence. */
  cache(elements: readonly HTMLElement[]) {
    this.clear();
    this.positions.set(this._document, {
      scrollPosition: this._viewportRuler.getViewportScrollPosition(),
    });

    elements.forEach(element => {
      this.positions.set(element, {
        scrollPosition: {top: element.scrollTop, left: element.scrollLeft},
        clientRect: getMutableClientRect(element),
      });
    });
  }

  /** Handles scrolling while a drag is taking place. */
  handleScroll(event: Event): ScrollPosition | null {
    const target = _getEventTarget<HTMLElement | Document>(event)!;
    const cachedPosition = this.positions.get(target);

    if (!cachedPosition) {
      return null;
    }

    const scrollPosition = cachedPosition.scrollPosition;
    let newTop: number;
    let newLeft: number;

    if (target === this._document) {
      const viewportScrollPosition = this._viewportRuler!.getViewportScrollPosition();
      newTop = viewportScrollPosition.top;
      newLeft = viewportScrollPosition.left;
    } else {
      newTop = (target as HTMLElement).scrollTop;
      newLeft = (target as HTMLElement).scrollLeft;
    }

    const topDifference = scrollPosition.top - newTop;
    const leftDifference = scrollPosition.left - newLeft;

    // Go through and update the cached positions of the scroll
    // parents that are inside the element that was scrolled.
    this.positions.forEach((position, node) => {
      if (position.clientRect && target !== node && target.contains(node)) {
        adjustClientRect(position.clientRect, topDifference, leftDifference);
      }
    });

    scrollPosition.top = newTop;
    scrollPosition.left = newLeft;

    return {top: topDifference, left: leftDifference};
  }
}
